import { Console, Effect, Schema as S } from "effect";
import { SupabaseServerClient } from "@/lib/supabase/client";
import { transformRawResultToEffect } from "@/lib/utils/supabase";
import { ProfileRpcs } from "@/schema/rpc/profile";
import { Profile } from "@/schema/supabase";

export const ProfileProcedures = ProfileRpcs.toLayer(
	// eslint-disable-next-line eslint(require-yield)
	Effect.gen(function* () {
		return {
			GetAllProfiles: () =>
				Effect.gen(function* () {
					const supabase = yield* SupabaseServerClient;
					const query = supabase.from("profiles").select("*", { count: "exact" });

					return yield* Effect.tryPromise(() => query).pipe(
						Effect.flatMap(transformRawResultToEffect),
						Effect.flatMap((result) => S.decodeUnknown(S.Array(Profile.Profile))(result.data)),
					);
				}).pipe(
					Effect.provide(SupabaseServerClient.Default),
					Effect.tapError(Console.log),
					Effect.tapDefect(Console.log),
					Effect.withSpan("@honey-pot/rpc/procedures/GetAllProfiles"),
				),

			GetProfileById: (request) =>
				Effect.gen(function* () {
					const supabase = yield* SupabaseServerClient;
					const query = supabase.from("profiles").select("*").eq("id", request.id).single();

					return yield* Effect.tryPromise(() => query).pipe(
						Effect.flatMap(transformRawResultToEffect),
						Effect.flatMap((result) => S.decodeUnknown(Profile.Profile)(result.data)),
					);
				}).pipe(
					Effect.provide(SupabaseServerClient.Default),
					Effect.tapError(Console.log),
					Effect.tapDefect(Console.log),
					Effect.withSpan("@honey-pot/rpc/procedures/GetProfileById"),
				),

			InsertProfile: (request) =>
				Effect.gen(function* () {
					const supabase = yield* SupabaseServerClient;
					const serialized = S.decodeUnknown(Profile.Serialize)(request);

					return yield* serialized.pipe(
						Effect.flatMap((request) => Effect.tryPromise(() => supabase.from("profiles").insert(request))),
						Effect.flatMap(transformRawResultToEffect),
						Effect.flatMap((result) => S.decodeUnknown(Profile.Profile)(result.data)),
					);
				}).pipe(
					Effect.provide(SupabaseServerClient.Default),
					Effect.tapError(Console.log),
					Effect.tapDefect(Console.log),
					Effect.withSpan("@honey-pot/rpc/procedures/InsertProfile"),
				),

			UpdateProfile: (request) =>
				Effect.gen(function* () {
					const supabase = yield* SupabaseServerClient;
					const serialized = S.decodeUnknown(Profile.Serialize)(request);

					return yield* serialized.pipe(
						Effect.flatMap((request) => Effect.tryPromise(() => supabase.from("profiles").update(request))),
						Effect.flatMap(transformRawResultToEffect),
						Effect.flatMap((result) => S.decodeUnknown(Profile.Profile)(result.data)),
					);
				}).pipe(
					Effect.provide(SupabaseServerClient.Default),
					Effect.tapError(Console.log),
					Effect.tapDefect(Console.log),
					Effect.withSpan("@honey-pot/rpc/procedures/UpdateProfile"),
				),

			DeleteProfile: (request) =>
				Effect.gen(function* () {
					const supabase = yield* SupabaseServerClient;
					const serialized = S.decodeUnknown(Profile.Serialize)(request);

					return yield* serialized.pipe(
						Effect.flatMap((request) =>
							Effect.tryPromise(() => supabase.from("profiles").delete().eq("id", request.id)),
						),
						Effect.asVoid,
					);
				}).pipe(
					Effect.provide(SupabaseServerClient.Default),
					Effect.tapError(Console.log),
					Effect.tapDefect(Console.log),
					Effect.withSpan("@honey-pot/rpc/procedures/DeleteProfile"),
				),
		};
	}),
);
