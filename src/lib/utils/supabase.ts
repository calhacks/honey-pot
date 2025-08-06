import { Effect } from "effect";

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
