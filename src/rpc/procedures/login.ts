import { AuthError } from "@supabase/supabase-js";
import { Console, Effect } from "effect";
import { SupabaseServerClient } from "@/lib/supabase/client";
import { transformRawResultWithErrorDataToEffect } from "@/lib/utils/supabase";
import { LoginRpcs, SupabaseEmailLoginError } from "@/rpc/rpc/login";

export const LoginProcedures = LoginRpcs.toLayer({
	EmailLogin: (request) =>
		Effect.gen(function* () {
			const supabase = yield* SupabaseServerClient;

			return yield* Effect.tryPromise(() =>
				supabase.auth.signInWithOtp({
					email: request.email,
					options: {
						shouldCreateUser: true,
					},
				}),
			).pipe(
				Effect.flatMap(transformRawResultWithErrorDataToEffect),
				Effect.catchAll((error) => {
					if (error instanceof AuthError) {
						return Effect.fail(new SupabaseEmailLoginError({ message: error.message }));
					}
					return Effect.fail(new SupabaseEmailLoginError({ message: "Unknown error" }));
				}),
				Effect.flatMap((_) => Effect.void),
			);
		}).pipe(
			Effect.provide(SupabaseServerClient.Default),
			Effect.tapErrorCause(Console.error),
			Effect.withSpan("@honey-pot/rpc/procedures/login/LoginProcedures/EmailLogin"),
		),
});
