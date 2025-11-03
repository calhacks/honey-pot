import { AuthError } from "@supabase/supabase-js";
import { Console, Effect } from "effect";
import { SupabaseServerClient } from "@/lib/supabase/client";
import { NodeTracer } from "@/lib/tracing/spans";
import { transformRawResultWithErrorDataToEffect } from "@/lib/utils/supabase";
import { LoginRpcs, SupabaseError } from "@/rpc/rpc/login";

export const LoginProcedures = LoginRpcs.toLayer({
	EmailSendOtp: (request) =>
		Effect.gen(function* () {
			const supabase = yield* SupabaseServerClient;

			yield* Effect.tryPromise(() =>
				supabase.auth.signInWithOtp({
					email: request.email,
					options: {
						shouldCreateUser: true,
					},
				}),
			).pipe(
				Effect.flatMap(transformRawResultWithErrorDataToEffect),
				Effect.catchAll((error) =>
					Effect.gen(function* () {
						if (error instanceof AuthError) {
							return yield* Effect.fail(new SupabaseError({ message: error.message, name: error.name }));
						}
						return yield* Effect.fail(
							new SupabaseError({ message: "Unknown error", name: "UnknownError" }),
						);
					}),
				),
			);

			return yield* Effect.succeed(undefined);
		}).pipe(
			Effect.tapErrorCause(Console.error),
			Effect.withSpan("@honey-pot/rpc/procedures/login/LoginProcedures/EmailSendOtp"),
			Effect.provide(SupabaseServerClient.Default),
			Effect.provide(NodeTracer),
		),
});
