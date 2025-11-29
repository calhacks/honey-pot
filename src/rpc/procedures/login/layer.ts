import { Console, Effect, pipe, Redacted } from "effect";
import { ServerEnv } from "@/lib/env/server";
import { SupabaseServerClient } from "@/lib/supabase/client";
import { NodeTracer } from "@/lib/tracing/spans";
import { LoginRpcs } from "@/rpc/procedures/login/schema";

export const LoginProcedures = LoginRpcs.toLayer({
	SendMagicLink: (request) =>
		Effect.gen(function* () {
			const supabase = yield* SupabaseServerClient;
			const { VercelUrl } = yield* ServerEnv;

			const send = supabase.auth.signInWithOtp({
				email: request.email,
				options: {
					shouldCreateUser: true,
					emailRedirectTo: `${Redacted.value(VercelUrl)}/auth/confirm`,
				},
			});

			return yield* pipe(
				Effect.tryPromise(() => send),
				Effect.filterOrFail(
					(result) => result.error === null,
					(result) => result.error,
				),
				Effect.andThen(void 0),
			);
		}).pipe(
			Effect.withSpan("@honey-pot/src/rpc/procedures/login/layer/LoginProcedures/SendMagicLink"),
			Effect.tapErrorCause(Console.error),
			Effect.provide(SupabaseServerClient.Live),
			Effect.provide(ServerEnv.Live),
			Effect.provide(NodeTracer),
		),

	GoogleOAuthLogin: () =>
		Effect.gen(function* () {
			const supabase = yield* SupabaseServerClient;
			const { VercelUrl } = yield* ServerEnv;

			const send = supabase.auth.signInWithOAuth({
				provider: "google",
				options: {
					redirectTo: `${Redacted.value(VercelUrl)}/auth/callback`,
				},
			});

			return yield* pipe(
				Effect.tryPromise(() => send),
				Effect.filterOrFail(
					(result) => result.error === null,
					(result) => result.error,
				),
				Effect.andThen((result) => result.data.url),
			);
		}).pipe(
			Effect.withSpan("@honey-pot/src/rpc/procedures/login/layer/LoginProcedures/GoogleOAuthLogin"),
			Effect.tapErrorCause(Console.error),
			Effect.provide(SupabaseServerClient.Live),
			Effect.provide(ServerEnv.Live),
			Effect.provide(NodeTracer),
		),

	SignOut: () =>
		Effect.gen(function* () {
			const supabase = yield* SupabaseServerClient;

			return yield* pipe(
				Effect.tryPromise(() => supabase.auth.signOut()),
				Effect.filterOrFail(
					(result) => result.error === null,
					(result) => result.error,
				),
				Effect.andThen(void 0),
			);
		}).pipe(
			Effect.withSpan("@honey-pot/src/rpc/procedures/login/layer/LoginProcedures/SignOut"),
			Effect.tapErrorCause(Console.error),
			Effect.provide(SupabaseServerClient.Live),
			Effect.provide(ServerEnv.Live),
			Effect.provide(NodeTracer),
		),
});
