import { Console, Effect } from "effect";
import { SupabaseServerClient } from "@/lib/supabase/client";
import { transformRawResultToEffect } from "@/lib/utils/supabase";
import { LoginRpcs } from "@/rpc/rpc/login";

export const LoginProcedures = LoginRpcs.toLayer(
	// eslint-disable-next-line eslint(require-yield)
	Effect.gen(function* () {
		return {
			EmailLogin: (request) =>
				Effect.gen(function* () {
					const supabase = yield* SupabaseServerClient;

					yield* Effect.tryPromise(() =>
						supabase.auth.signInWithOtp({
							email: request.email,
							options: {
								shouldCreateUser: true,
							},
						}),
					).pipe(Effect.flatMap(transformRawResultToEffect));

					return yield* Effect.void;
				}).pipe(
					Effect.provide(SupabaseServerClient.Default),
					Effect.tapError(Console.error),
					Effect.tapErrorCause(Console.error),
					Effect.withSpan("@honey-pot/rpc/procedures/login/LoginProcedures/EmailLogin"),
				),
		};
	}),
);
