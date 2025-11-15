import { type CookieOptions, createServerClient } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";
import { Context, Effect, Layer, Redacted } from "effect";
import { cookies } from "next/headers";
import { ServerEnv } from "@/lib/env/server";
import type { Database } from "@/lib/supabase/database.types";

export type SupabaseServerClientType = SupabaseClient<Database>;

export class SupabaseServerClient extends Context.Tag("@honey-pot/src/lib/supabase/client/server/SupabaseServerClient")<
	SupabaseServerClient,
	SupabaseServerClientType
>() {
	static Live = Layer.effect(
		SupabaseServerClient,
		Effect.gen(function* () {
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
		}),
	);
}
