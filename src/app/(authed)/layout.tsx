import { Cause, Effect, Exit, pipe } from "effect";
import { redirect } from "next/navigation";
import { PropsWithChildren } from "react";
import { ServerEnv } from "@/lib/env/server";
import { SupabaseServerClient } from "@/lib/supabase/client";

export default async function AuthedLayout({ children }: PropsWithChildren) {
	const result = await Effect.gen(function* () {
		const client = yield* SupabaseServerClient;

		const user = yield* pipe(
			Effect.tryPromise(() => client.auth.getUser()),
			Effect.andThen((response) => Effect.fromNullable(response.data.user)),
			Effect.orElseFail(() => "/login"),
		);

		yield* pipe(
			Effect.tryPromise(() => client.from("profiles").select("*").eq("user_id", user.id).single()),
			Effect.andThen((response) => Effect.fromNullable(response.data)),
			Effect.orElseFail(() => "/onboarding"),
		);
	}).pipe(Effect.provide(SupabaseServerClient.Live), Effect.provide(ServerEnv.Live), Effect.runPromiseExit);

	return Exit.match(result, {
		onFailure: (cause) => {
			Cause.match(cause, {
				onDie: () => redirect("/login"),
				onEmpty: () => children,
				onFail: (fail) => (typeof fail === "string" ? redirect(fail) : redirect("/login")),
				onInterrupt: () => redirect("/login"),
				onParallel: () => redirect("/login"),
				onSequential: () => redirect("/login"),
			});
		},
		onSuccess: () => children,
	});
}
