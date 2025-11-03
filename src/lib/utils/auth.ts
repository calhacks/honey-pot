import { Data, Effect, Schema } from "effect";
import { SupabaseUser } from "@/lib/utils/supabase";
import type { Enums } from "@/schema/supabase";

export const withAdminAccess = <A, E, R>(self: Effect.Effect<A, E, R>) =>
	Effect.gen(function* () {
		yield* checkUserRole("admin").pipe(Effect.unlessEffect(() => new Unauthorized({ message: "Unauthorized" })));
	});

export const checkUserRole = Effect.fnUntraced(function* (role: Enums.Role) {
	const user = yield* SupabaseUser;
	return user.role === role;
});

export class UserNotFound extends Data.TaggedError("UserNotFound")<{ message: string }> {}

export class Unauthorized extends Data.TaggedError("Unauthorized")<{ message: string }> {}
