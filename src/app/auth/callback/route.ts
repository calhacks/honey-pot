import { Effect, Schema } from "effect";
import { type NextRequest, NextResponse } from "next/server";
import { ServerEnv } from "@/lib/env/server";
import { SupabaseServerClient } from "@/lib/supabase/client";
import { NodeTracer } from "@/lib/tracing/spans";

export const GET = async (request: NextRequest) => {
	const redirectUrl = await Effect.gen(function* () {
		const { searchParams, origin } = new URL(request.url);
		const code = Schema.decodeUnknown(Schema.NonEmptyString)(searchParams.get("code"));

		const next = yield* Schema.decodeUnknown(Schema.NonEmptyString)(searchParams.get("next")).pipe(
			Effect.orElseSucceed(() => "/"),
			Effect.map((next) => (next.startsWith("/") ? next : "/")),
		);

		return yield* Effect.match(code, {
			onSuccess: (code) =>
				Effect.gen(function* () {
					const supabase = yield* SupabaseServerClient;
					const { error } = yield* Effect.tryPromise(() => supabase.auth.exchangeCodeForSession(code));

					if (error) {
						return yield* Effect.fail(error);
					}

					return `${origin}${next}`;
				}),
			onFailure: () => Effect.succeed(`${origin}/login"`),
		});
	}).pipe(
		Effect.withSpan("@honey-pot/src/app/auth/callback/route/GET"),

		Effect.flatten,
		Effect.catchAll(() => Effect.succeed(`${origin}/login"`)),

		Effect.provide(SupabaseServerClient.Live),
		Effect.provide(ServerEnv.Live),
		Effect.provide(NodeTracer),
		Effect.runPromise,
	);

	return NextResponse.redirect(redirectUrl);
};
