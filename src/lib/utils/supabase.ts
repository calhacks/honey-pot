import { Data, Effect, pipe } from "effect";
import { SupabaseServerClient } from "@/lib/supabase/client/server";

export class SupabaseUser extends Effect.Service<SupabaseUser>()("@honey-pot/src/lib/utils/supabase/SupabaseUser", {
	dependencies: [SupabaseServerClient.Live],

	effect: Effect.gen(function* () {
		const supabase = yield* SupabaseServerClient;

		return yield* pipe(
			Effect.tryPromise(() => supabase.auth.getUser()),
			Effect.filterOrFail(
				(response) => response.error === null,
				(response) => new UserNotFound({ message: response.error.message }),
			),
			Effect.map(({ data }) => data.user),
		);
	}),
}) {}

export class UserNotFound extends Data.TaggedError("UserNotFound")<{ message?: string }> {}
