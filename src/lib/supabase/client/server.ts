import { type CookieOptions, createServerClient } from "@supabase/ssr";
import { Console, Effect, Redacted } from "effect";
import { cookies } from "next/headers";
import { ServerEnv } from "@/lib/env/server";
import type { Database } from "@/lib/supabase/database.types";

export class SupabaseServerClient extends Effect.Service<SupabaseServerClient>()(
	"@honey-pot/src/lib/supabase/client/server/SupabaseServerClient",
	{
		effect: Effect.gen(function* () {
			const { SupabaseUrl, SupabasePublishableDefaultKey } = yield* ServerEnv;
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
