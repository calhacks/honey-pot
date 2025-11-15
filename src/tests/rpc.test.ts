import { it } from "@effect/vitest";
import { Effect } from "effect";
import { ServerEnv } from "@/lib/env/server";
import { SupabaseServerClient } from "@/lib/supabase/client/server";

it.effect("Load `ServerEnvTest`", () =>
	Effect.gen(function* () {
		yield* ServerEnv;
	}).pipe(Effect.provide(ServerEnv.Test)),
);

it.effect("Load Supabase server client", () =>
	Effect.gen(function* () {
		yield* SupabaseServerClient;
	}).pipe(Effect.provide(SupabaseServerClient.Test), Effect.provide(ServerEnv.Test)),
);
