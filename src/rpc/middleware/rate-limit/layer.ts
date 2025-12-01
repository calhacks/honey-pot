import { RateLimiter } from "@effect/experimental";
import * as Redis from "@effect/experimental/RateLimiter/Redis";
import { Duration, Effect, Layer, Redacted, Schema } from "effect";
import { ServerEnv } from "@/lib/env/server";
import { SupabaseServerClient } from "@/lib/supabase/client";
import { RateLimiterTag } from "@/rpc/middleware/rate-limit/context";
import { BadRequest, InternalServerError } from "@/schema/http";

export const Cache = Layer.unwrapEffect(
	Effect.gen(function* () {
		const { RedisUrl } = yield* ServerEnv;
		const url = Redacted.value(RedisUrl);

		const result = Redis.layerStore({
			host: url.hostname,
			port: Number(url.port),
			username: url.username,
			password: url.password,
		});
		return result;
	}).pipe(Effect.provide(ServerEnv.Live)),
);

// export const RateLimiterLayer = RateLimiter.layer.pipe(Layer.provide(Cache.pipe(Layer.provide(ServerEnv.Live))));
export const RateLimiterLayer = RateLimiter.layer.pipe(Layer.provide(Cache));

export const RateLimiterMiddleware = Layer.succeed(
	RateLimiterTag,
	RateLimiterTag.of((options) =>
		Effect.gen(function* () {
			const supabase = yield* SupabaseServerClient;
			const limiter = yield* RateLimiter.RateLimiter;

			const userResponse = yield* Effect.tryPromise({
				try: () => supabase.auth.getUser(),
				catch: () => InternalServerError.make({ message: "Could not reach Supabase" }),
			});

			const user = userResponse.data.user;
			if (user !== null) {
				yield* limiter.consume({
					algorithm: "fixed-window",
					onExceeded: "fail",
					window: Duration.minutes(1),
					limit: 10,
					key: `user_id:${user.id}`,
				});
			} else {
				const ip = yield* Effect.fromNullable(options.headers["x-forwarded-for"]).pipe(
					Effect.orElseFail(() => BadRequest.make({ message: "`X-Forwarded-For` header is required" })),
				);

				yield* limiter.consume({
					algorithm: "fixed-window",
					onExceeded: "fail",
					window: Duration.minutes(1),
					limit: 10,
					key: `ip:${ip}`,
				});
			}

			return Schema.Void;
		}).pipe(
			Effect.provide(SupabaseServerClient.Live),
			Effect.provide(ServerEnv.Live),
			Effect.provide(RateLimiterLayer),
		),
	),
);
