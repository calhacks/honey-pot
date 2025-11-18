import { Data, Effect, pipe } from "effect";
import { SupabaseServerClient } from "@/lib/supabase/client";
import { BadGateway } from "@/schema/http";

export class SupabaseUser extends Effect.Service<SupabaseUser>()("@honey-pot/src/lib/supabase/user/SupabaseUser", {
	dependencies: [SupabaseServerClient.Live],

	effect: Effect.gen(function* () {
		const supabase = yield* SupabaseServerClient;

		return yield* pipe(
			Effect.tryPromise({
				try: () => supabase.auth.getUser(),
				catch: () => BadGateway.make({ message: "Failed to get user" }),
			}),
			Effect.filterOrFail(
				(response) => response.error === null,
				(response) => new UserNotFound({ message: response.error.message }),
			),
			Effect.map(({ data }) => data.user),
		);
	}),
}) {}

export class UserNotFound extends Data.TaggedError("UserNotFound")<{ message?: string }> {}
