// biome-ignore lint/suspicious/noShadowRestrictedNames: It's ok
import { Array, Console, Effect, pipe, Schema } from "effect";
import { ServerEnv } from "@/lib/env/server";
import { SupabaseServerClient } from "@/lib/supabase/client";
import { SupabaseUser } from "@/lib/supabase/user";
import { NodeTracer } from "@/lib/tracing/spans";
import { ProfileRpcs } from "@/rpc/procedures/profile/schema";
import { Profile } from "@/schema/supabase";

export const ProfileProcedures = ProfileRpcs.toLayer({
	GetAllProfiles: () =>
		Effect.gen(function* () {
			const supabase = yield* SupabaseServerClient;

			return yield* pipe(
				Effect.tryPromise(() => supabase.from("profiles").select("*")),
				Effect.filterOrFail(
					(response) => response.error === null,
					(response) => response.error,
				),
				Effect.andThen((response) => Schema.decodeUnknown(Schema.Array(Profile))(response.data)),
			);
		}).pipe(
			Effect.tapErrorCause(Console.error),
			Effect.withSpan("@honey-pot/src/rpc/procedures/profile/layer/ProfileProcedures/GetAllProfiles"),
			Effect.provide(SupabaseServerClient.Live),
			Effect.provide(SupabaseUser.Default),
			Effect.provide(ServerEnv.Live),
			Effect.provide(NodeTracer),
		),

	GetProfileById: (request) =>
		Effect.gen(function* () {
			const supabase = yield* SupabaseServerClient;

			return yield* pipe(
				Effect.tryPromise(() => supabase.from("profiles").select("*").eq("id", request.id).single()),
				Effect.filterOrFail(
					(response) => response.error === null,
					(response) => response.error,
				),
				Effect.andThen((response) => Schema.decodeUnknown(Profile)(response.data)),
			);
		}).pipe(
			Effect.tapErrorCause(Console.error),
			Effect.withSpan("@honey-pot/src/rpc/procedures/profile/layer/ProfileProcedures/GetProfileById"),
			Effect.provide(SupabaseServerClient.Live),
			Effect.provide(ServerEnv.Live),
			Effect.provide(NodeTracer),
		),

	CreateProfile: (request) =>
		Effect.gen(function* () {
			const supabase = yield* SupabaseServerClient;

			return yield* pipe(
				Effect.tryPromise(() => supabase.from("profiles").insert(request).select()),
				Effect.filterOrFail(
					(response) => response.error === null,
					(response) => response.error,
				),
				Effect.andThen((response) => Schema.decodeUnknown(Schema.NonEmptyArray(Profile))(response.data)),
				Effect.map(Array.headNonEmpty),
			);
		}).pipe(
			Effect.tapErrorCause(Console.error),
			Effect.withSpan("@honey-pot/src/rpc/procedures/profile/layer/ProfileProcedures/CreateProfile"),
			Effect.provide(SupabaseServerClient.Live),
			Effect.provide(ServerEnv.Live),
			Effect.provide(NodeTracer),
		),

	UpdateProfile: (request) =>
		Effect.gen(function* () {
			const supabase = yield* SupabaseServerClient;

			return yield* pipe(
				Effect.tryPromise(() => supabase.from("profiles").update(request).select()),
				Effect.filterOrFail(
					(response) => response.error === null,
					(response) => response.error,
				),
				Effect.andThen(Schema.decodeUnknown(Schema.NonEmptyArray(Profile))),
				Effect.map(Array.headNonEmpty),
			);
		}).pipe(
			Effect.tapErrorCause(Console.error),
			Effect.withSpan("@honey-pot/src/rpc/procedures/profile/layer/ProfileProcedures/UpdateProfile"),
			Effect.provide(SupabaseServerClient.Live),
			Effect.provide(ServerEnv.Live),
			Effect.provide(NodeTracer),
		),

	DeleteProfile: (request) =>
		Effect.gen(function* () {
			const supabase = yield* SupabaseServerClient;

			return yield* pipe(
				Effect.tryPromise(() => supabase.from("profiles").delete().eq("id", request.id)),
				Effect.filterOrFail(
					(response) => response.error === null,
					(response) => response.error,
				),
				Effect.andThen(void 0),
			);
		}).pipe(
			Effect.tapErrorCause(Console.error),
			Effect.withSpan("@honey-pot/src/rpc/procedures/profile/layer/ProfileProcedures/DeleteProfile"),
			Effect.provide(SupabaseServerClient.Live),
			Effect.provide(ServerEnv.Live),
			Effect.provide(NodeTracer),
		),
});
