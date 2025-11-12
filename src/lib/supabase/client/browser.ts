// import { type CookieOptions, createServerClient } from "@supabase/ssr";
import { createBrowserClient } from "@supabase/ssr";
import { Console, Effect, Redacted } from "effect";
import { cookies } from "next/headers";
import { ClientEnv } from "@/lib/env/client";
import { ServerEnv } from "@/lib/env/server";
import type { Database } from "@/lib/supabase/database.types";

export class SupabaseBrowserClient extends Effect.Service<SupabaseBrowserClient>()(
	"@honey-pot/src/lib/supabase/client/browser/SupabaseServerClient",
	{
		effect: Effect.gen(function* () {
			const { SupabaseUrl, SupabasePublishableDefaultKey } = yield* ClientEnv;
			const cookieStore = yield* Effect.promise(() => cookies());

			const supabaseClient = createServerClient<Database>(
				Redacted.value(SupabaseUrl),
				Redacted.value(SupabasePublishableDefaultKey),
				{
					cookies: {
						getAll: () => cookieStore.getAll(),
						setAll: (cookies: { name: string; value: string; options: CookieOptions }[]) =>
							cookies.forEach(({ name, value, options }) => {
								cookieStore.set(name, value, options);
							}),
					},
				},
			);
			return supabaseClient;
		}).pipe(Effect.provide(ServerEnv.Default), Effect.tapErrorCause(Console.error)),
	},
) {}
