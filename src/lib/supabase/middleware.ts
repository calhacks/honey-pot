import { createServerClient } from "@supabase/ssr";
import { Effect, Redacted } from "effect";
import { type NextRequest, NextResponse } from "next/server";
import { ServerEnv } from "@/lib/env/server";
import { NodeTracer } from "@/lib/tracing/spans";

export const updateSession = async (request: NextRequest) =>
	Effect.gen(function* () {
		let response = NextResponse.next({ request });

		const { SupabaseUrl, SupabasePublishableDefaultKey } = yield* ServerEnv;
		const supabase = createServerClient(
			Redacted.value(SupabaseUrl),
			Redacted.value(SupabasePublishableDefaultKey),
			{
				cookies: {
					getAll() {
						return request.cookies.getAll();
					},
					setAll(cookiesToSet) {
						cookiesToSet.forEach(({ name, value }) => {
							request.cookies.set(name, value);
						});
						response = NextResponse.next({ request });
						cookiesToSet.forEach(({ name, value, options }) => {
							response.cookies.set(name, value, options);
						});
					},
				},
			},
		);

		return yield* Effect.tryPromise(() => supabase.auth.getUser()).pipe(
			Effect.map(({ data }) => data.user),
			Effect.flatMap(Effect.fromNullable),
			Effect.map(() => response),
			Effect.catchAll(() => {
				if (!request.nextUrl.pathname.startsWith("/login")) {
					const url = request.nextUrl.clone();
					url.pathname = "/login";
					return Effect.succeed(NextResponse.redirect(url));
				}
				return Effect.succeed(response);
			}),
		);
	}).pipe(
		Effect.withSpan("@honey-pot/src/lib/supabase/middleware/updateSession"),
		Effect.provide(ServerEnv.Default),
		Effect.provide(NodeTracer),
		Effect.runPromise,
	);
