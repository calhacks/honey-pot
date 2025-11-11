import { Cause, Effect, Exit } from "effect";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

type EffectMutationSuccessFn<Data> = (data: Data) => void;
type EffectMutationErrorFn<Error> = (error: Error) => void;

type EffectMutationOptions<Args, Data, Error> = {
	arg: Args & Partial<{ onSuccess?: EffectMutationSuccessFn<Data>; onError?: EffectMutationErrorFn<Error> }>;
};

export function useEffectMutationSWR<A, E, Args>(key: string, fetcher: (args: Args) => Effect.Effect<A, E>) {
	return useSWRMutation(
		key,
		async (_, options: EffectMutationOptions<Args, A, E>) => {
			const result = await fetcher(options.arg).pipe(Effect.runPromiseExit);
			return Exit.match(result, {
				onSuccess: (value) => {
					if (options.arg.onSuccess) {
						options.arg.onSuccess(value);
					}
					return value;
				},
				onFailure: (error) => {
					if (options.arg.onError) {
						// `ReturnType<Cause.squash>` is always `unknown` hence cast
						// not sure why this is; should look for alternate solution
						options.arg.onError(Cause.squash(error) as E);
					}
					throw error;
				},
			});
		},
		{
			throwOnError: false,
		},
	);
}

export function useEffectSWR<A, E, Args>(key: string, fetcher: (args: Args) => Effect.Effect<A, E>) {
	return useSWR(
		key,
		async (options: EffectMutationOptions<Args, A, E>) => {
			const result = await fetcher(options.arg).pipe(Effect.runPromiseExit);
			return Exit.match(result, {
				onSuccess: (value) => {
					if (options.arg.onSuccess) {
						options.arg.onSuccess(value);
					}
					return value;
				},
				onFailure: (error) => {
					if (options.arg.onError) {
						// `ReturnType<Cause.squash>` is always `unknown` hence cast
						// not sure why this is; should look for alternate solution
						options.arg.onError(Cause.squash(error) as E);
					}
					throw error;
				},
			});
		},
		{
			errorRetryCount: 3,
			refreshInterval: 60_000,
		},
	);
}
