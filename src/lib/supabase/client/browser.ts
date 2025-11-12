import { createBrowserClient } from "@supabase/ssr";
import { Console, Effect, Redacted } from "effect";
import { ClientEnv } from "@/lib/env/client";
import type { Database } from "@/lib/supabase/database.types";

// Note: The only times you should use this client is to interact with the user object.
// There should almost never be a reason to interact with the database using this client – use the RPC functions!
export class SupabaseBrowserClient extends Effect.Service<SupabaseBrowserClient>()(
	"@honey-pot/src/lib/supabase/client/browser/SupabaseServerClient",
	{
		effect: Effect.gen(function* () {
			const { NextPublicSupabasePublishableKey, NextPublicSupabaseUrl } = yield* ClientEnv;

			const supabaseClient = createBrowserClient<Database>(
				Redacted.value(NextPublicSupabaseUrl),
				Redacted.value(NextPublicSupabasePublishableKey),
			);

			return supabaseClient;
		}).pipe(Effect.provide(ClientEnv.Default), Effect.tapErrorCause(Console.error)),
	},
) {}
