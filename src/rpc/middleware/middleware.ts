import { Console, Effect, Layer, pipe, Schema } from "effect";
import { ServerEnv } from "@/lib/env/server";
import { SupabaseServerClient } from "@/lib/supabase/client";
import { SupabaseUser } from "@/lib/supabase/user";
import { AdminUser, AuthenticatedUser } from "@/rpc/middleware/context";
import { BadGateway, Forbidden, type HttpError, InternalServerError, NotFound, Unauthorized } from "@/schema/http";
import { AdminProfile, Profile } from "@/schema/supabase";

export const AuthenticatedUserMiddleware: Layer.Layer<AuthenticatedUser, HttpError> = Layer.succeed(
	AuthenticatedUser,
	AuthenticatedUser.of(() =>
		Effect.gen(function* () {
			const supabase = yield* SupabaseServerClient;
			const user = yield* SupabaseUser;

			const profileResponse = yield* Effect.tryPromise({
				try: () => supabase.from("profiles").select().eq("user_id", user.id).single(),
				catch: () => BadGateway.make({ message: "Failed to fetch profile" }),
			});

			const profile = yield* pipe(
				Effect.fromNullable(profileResponse.data),
				Effect.andThen(Schema.decodeUnknown(Profile)),
				Effect.orElseFail(() => Forbidden.make({ message: "Profile not found" })),
			);

			return profile;
		}).pipe(
			Effect.tapErrorCause(Console.error),
			Effect.provide(SupabaseServerClient.Live),
			Effect.provide(SupabaseUser.Default),
			Effect.provide(ServerEnv.Live),
			Effect.catchTags({
				ConfigError: () => Effect.fail(InternalServerError.make({ message: "Error when fetching profile" })),
				UserNotFound: () => Effect.fail(NotFound.make({ message: "User session not found" })),
			}),
		),
	),
);

export const AdminUserMiddleware: Layer.Layer<AdminUser, HttpError> = Layer.succeed(
	AdminUser,
	AdminUser.of(() =>
		Effect.gen(function* () {
			const supabase = yield* SupabaseServerClient;
			const user = yield* SupabaseUser;

			const profileResponse = yield* Effect.tryPromise({
				try: () => supabase.from("profiles").select().eq("user_id", user.id).single(),
				catch: () => BadGateway.make({ message: "Failed to fetch profile" }),
			});

			const profile = yield* Effect.fromNullable(profileResponse.data).pipe(
				Effect.orElseFail(() => Forbidden.make({ message: "Profile not found" })),
			);

			const adminProfile = yield* Schema.decodeUnknown(AdminProfile)(profile).pipe(
				Effect.orElseFail(() => Unauthorized.make({ message: "Not authorized" })),
			);

			return adminProfile;
		}).pipe(
			Effect.tapErrorCause(Console.error),
			Effect.provide(SupabaseServerClient.Live),
			Effect.provide(SupabaseUser.Default),
			Effect.provide(ServerEnv.Live),
			Effect.catchTags({
				ConfigError: () => Effect.fail(InternalServerError.make({ message: "Error when fetching profile" })),
				UserNotFound: () => Effect.fail(NotFound.make({ message: "User session not found" })),
			}),
		),
	),
);
