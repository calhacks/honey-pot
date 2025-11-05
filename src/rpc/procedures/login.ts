import { Console, Effect, Redacted } from "effect";
import { ServerEnv } from "@/lib/env/server";
import { SupabaseServerClient } from "@/lib/supabase/client";
import { NodeTracer } from "@/lib/tracing/spans";
import { transformRawResultWithErrorDataToEffect } from "@/lib/utils/supabase";
import { LoginRpcs } from "@/rpc/rpc/login";

export const LoginProcedures = LoginRpcs.toLayer({
	SendMagicLink: (request) =>
		Effect.gen(function* () {
			const supabase = yield* SupabaseServerClient;

			yield* Effect.tryPromise(() =>
				supabase.auth.signInWithOtp({
					email: request.email,
					options: {
						shouldCreateUser: true,
					},
				}),
			).pipe(Effect.flatMap(transformRawResultWithErrorDataToEffect));

			return undefined;
		}).pipe(
			Effect.withSpan("@honey-pot/src/rpc/procedures/login/LoginProcedures/SendMagicLink"),
			Effect.tapErrorCause(Console.error),
			Effect.provide(SupabaseServerClient.Default),
			Effect.provide(NodeTracer),
		),

	GoogleOAuthLogin: () =>
		Effect.gen(function* () {
			const supabase = yield* SupabaseServerClient;
			const { NextPublicVercelUrl } = yield* ServerEnv;

			const { data, error } = yield* Effect.tryPromise(() =>
				supabase.auth.signInWithOAuth({
					provider: "google",
					options: {
						redirectTo: `${Redacted.value(NextPublicVercelUrl)}/auth/callback`,
					},
				}),
			);

			if (error) {
				return yield* Effect.fail(error);
			}

			return data.url;
		}).pipe(
			Effect.withSpan("@honey-pot/src/rpc/procedures/login/LoginProcedures/GoogleOAuthLogin"),
			Effect.tapErrorCause(Console.error),
			Effect.provide(SupabaseServerClient.Default),
			Effect.provide(ServerEnv.Default),
			Effect.provide(NodeTracer),
		),
});
