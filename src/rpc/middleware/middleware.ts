import { Console, Effect, Layer, Schema } from "effect";
import { ServerEnv } from "@/lib/env/server";
import { SupabaseServerClient } from "@/lib/supabase/client/server";
import { SupabaseUser } from "@/lib/utils/supabase";
import { BadGateway, Forbidden, type HttpError, InternalServerError, NotFound } from "@/schema/http";
import { Profile } from "@/schema/supabase";
import { AuthenticatedUserMiddlewareContext } from "./context";

export const AuthenticatedUserMiddleware: Layer.Layer<AuthenticatedUserMiddlewareContext, HttpError> = Layer.succeed(
	AuthenticatedUserMiddlewareContext,
	AuthenticatedUserMiddlewareContext.of(() =>
		Effect.gen(function* () {
			const supabase = yield* SupabaseServerClient;
			const user = yield* SupabaseUser;

			const profileResponse = yield* Effect.tryPromise({
				try: () => supabase.from("profiles").select().eq("user_id", user.id).single(),
				catch: () => BadGateway.make({ message: "Failed to fetch profile" }),
			});

			const profile = yield* Effect.succeed(profileResponse).pipe(
				Effect.andThen((data) => data.data),
				Effect.andThen(Effect.fromNullable),
				Effect.andThen(Schema.decodeUnknown(Profile)),
				Effect.orElseFail(() => Forbidden.make({ message: "Profile not found" })),
			);

			return profile;
		}).pipe(
			Effect.provide(SupabaseServerClient.Live),
			Effect.provide(SupabaseUser.Default),
			Effect.provide(ServerEnv.Live),
			Effect.catchTags({
				ConfigError: () => Effect.fail(InternalServerError.make({ message: "Error when fetching profile" })),
				UserNotFound: () => Effect.fail(NotFound.make({ message: "User session not found" })),
			}),
			Effect.tapErrorCause(Console.error),
		),
	),
);
