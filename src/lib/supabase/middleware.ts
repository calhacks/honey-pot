import { createServerClient } from "@supabase/ssr";
import { Effect, pipe, Redacted, Schema } from "effect";
import { type NextRequest, NextResponse } from "next/server";
import { ServerEnv } from "@/lib/env/server";

const authenticatedRoutes = Schema.Literal("/dashboard");

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

		const { pathname } = request.nextUrl;

		const authenticatedRoute =
			pathname === "/" || authenticatedRoutes.literals.some((route) => route.startsWith(pathname));

		if (!authenticatedRoute) {
			return response;
		}

		const user = pipe(
			Effect.tryPromise(() => supabase.auth.getUser()),
			Effect.map(({ data }) => data.user),
			Effect.flatMap(Effect.fromNullable),
		);

		return yield* Effect.match(user, {
			onFailure: (_error) => {
				if (pathname?.startsWith("/login")) {
					return response;
				}
				const url = request.nextUrl.clone();
				url.pathname = "/login";
				return NextResponse.redirect(url);
			},
			onSuccess: (_user) => {
				return response;
			},
		});
	}).pipe(
		// Not sure if it's beneficial to have tracing in middleware (bloats traces)
		// Effect.withSpan("@honey-pot/src/lib/supabase/middleware/updateSession"),
		Effect.provide(ServerEnv.Default),
		Effect.runPromise,
	);
