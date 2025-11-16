import { afterAll, beforeAll, describe, it } from "@effect/vitest";
import type { SupabaseClient } from "@supabase/supabase-js";
import { Effect, Logger, pipe } from "effect";
import { ServerEnv } from "@/lib/env/server";
import { SupabaseServerClient } from "@/lib/supabase/client/server";
import type { Database } from "@/lib/supabase/database.types";
import { Rpc, RpcProvider } from "@/rpc/client/server";

describe("Initialization", () => {
	let admin: SupabaseClient<Database>;

	beforeAll(async () => {
		admin = SupabaseServerClient.pipe(
			Effect.provide(SupabaseServerClient.Admin),
			Effect.provide(ServerEnv.Test),
			Effect.runSync,
		);
	});

	afterAll(async () => {
		await pipe(
			Effect.tryPromise(() => admin.auth.admin.deleteUser("11111111-1111-1111-1111-111111111111")),
			Effect.runPromise,
		);
	});

	it.effect("Create user", () =>
		Effect.gen(function* () {
			const _user = yield* pipe(
				Effect.tryPromise(() =>
					admin.auth.admin.createUser({
						id: "11111111-1111-1111-1111-111111111111",
						email: "test@example.com",
						password: "password",
						email_confirm: true,
					}),
				),
				Effect.filterOrFail(
					(response) => response.error === null,
					(response) => response.error,
				),
				Effect.map((response) => response.data.user),
			);
		}).pipe(Effect.provide(Logger.pretty)),
	);

	it("Create profile", () => {
		RpcProvider.Test(
			Rpc.CreateProfile({
				avatar_url: "https://example.com/avatar.png",
				role: "admin",
				user_id: "11111111-1111-1111-1111-111111111111",
			}),
		);
	});
});
