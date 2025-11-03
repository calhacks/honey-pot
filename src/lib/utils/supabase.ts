import type { AuthError, User } from "@supabase/supabase-js";
import { Data, Effect } from "effect";
import { SupabaseServerClient } from "@/lib/supabase/client";

export class SupabaseUser extends Effect.Service<SupabaseUser>()("@honey-pot/src/lib/utils/supabase/SupabaseUser", {
	effect: Effect.gen(function* () {
		const supabase = yield* SupabaseServerClient;
		return yield* Effect.tryPromise(() => supabase.auth.getUser()).pipe(
			Effect.flatMap(transformRawResultWithErrorDataToEffect<{ user: User }, { user: null }, AuthError>),
			Effect.map((user) => user.user),
			Effect.catchAll(() => new UserNotFound()),
		);
	}),
	dependencies: [SupabaseServerClient.Default],
}) {}

export class UserNotFound extends Data.TaggedError("UserNotFound") {}

export type RawResult<TData, TError> =
	| {
			data: TData;
			error: null;
	  }
	| {
			data: null;
			error: TError;
	  };

export type RawResultWithErrorData<TData, TErrorData, TError> =
	| {
			data: TData;
			error: null;
	  }
	| {
			data: TErrorData;
			error: TError;
	  };

export const transformRawResultToEffect = <TData, TError>(input: RawResult<TData, TError>) =>
	((result: RawResult<TData, TError>): result is { data: TData; error: null } => result.error === null)(input)
		? Effect.succeed(input.data)
		: Effect.fail(input.error);

export const transformRawResultWithErrorDataToEffect = <TData, TErrorData, TError>(
	input: RawResultWithErrorData<TData, TErrorData, TError>,
) =>
	((result: RawResultWithErrorData<TData, TErrorData, TError>): result is { data: TData; error: null } =>
		result.error === null)(input)
		? Effect.succeed(input.data)
		: Effect.fail(input.error);
