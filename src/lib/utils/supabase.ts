import { Effect } from "effect";

export type RawResult<T, E, Rest = unknown> = {
	data: T | null;
	error: E | null;
} & Rest;

export const transformRawResultToEffect = <T, E, Result extends RawResult<T, E, unknown>>(input: Result) =>
	input.error === null ? Effect.succeed(input) : Effect.fail(input);

export const supabaseQueryToEffect = <T extends PromiseLike<RawResult<any, any, any>>>(query: T) =>
	Effect.tryPromise(() => query).pipe(Effect.flatMap(transformRawResultToEffect));
