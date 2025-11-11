import { Console, Effect, Layer, Schema } from "effect";
import { SupabaseServerClient } from "@/lib/supabase/client";
import { SupabaseUser } from "@/lib/utils/supabase";
import { BadGateway, Forbidden, InternalServerError, NotFound } from "@/schema/http";
import { Profile } from "@/schema/supabase";
import { AuthenticatedUserMiddlewareContext } from "./context";

export const AuthenticatedUserMiddleware: Layer.Layer<AuthenticatedUserMiddlewareContext> = Layer.succeed(
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
				Effect.andThen(({ data: user }) => user),
				Effect.andThen(Effect.fromNullable),
				Effect.andThen((user) => Schema.decodeUnknown(Profile.Profile)(user)),
				Effect.orElseFail(() => Forbidden.make({ message: "Profile not found" })),
			);

			return profile;
		}).pipe(
			Effect.provide(SupabaseServerClient.Default),
			Effect.provide(SupabaseUser.Default),
			Effect.catchTags({
				ConfigError: () => Effect.fail(InternalServerError.make({ message: "Error when fetching profile" })),
				UserNotFound: () => Effect.fail(NotFound.make({ message: "User session not found" })),
			}),
			Effect.tapErrorCause(Console.error),
		),
	),
);
