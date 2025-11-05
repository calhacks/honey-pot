import { createServerClient } from "@supabase/ssr";
import { Effect, pipe, Redacted } from "effect";
import { type NextRequest, NextResponse } from "next/server";
import { ServerEnv } from "@/lib/env/server";
// import { NodeTracer } from "@/lib/tracing/spans";

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

		return yield* pipe(
			Effect.tryPromise(() => supabase.auth.getUser()),
			Effect.map(({ data }) => data.user),
			Effect.flatMap(Effect.fromNullable),
			// successfully fetch user => user exists => continue response
			Effect.map(() => response),
			// otherwise redirect to login page
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
		// Not sure if it's beneficial to have tracing in middleware (bloats traces)
		// Effect.withSpan("@honey-pot/src/lib/supabase/middleware/updateSession"),
		Effect.provide(ServerEnv.Default),
		Effect.runPromise,
	);
