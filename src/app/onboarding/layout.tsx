import { Cause, Effect, Exit, pipe, Schema } from "effect";
import { redirect } from "next/navigation";
import { PropsWithChildren } from "react";
import { ServerEnv } from "@/lib/env/server";
import { SupabaseServerClient } from "@/lib/supabase/client";

export default async function OnboardingLayout({ children }: PropsWithChildren) {
	const result = await Effect.gen(function* () {
		const client = yield* SupabaseServerClient;

		const user = yield* pipe(
			Effect.tryPromise(() => client.auth.getUser()),
			Effect.andThen((response) => Effect.fromNullable(response.data.user)),
			Effect.orElseFail(() => "/login"),
		);

		yield* pipe(
			Effect.tryPromise(() => client.from("profiles").select("*").eq("user_id", user.id).single()),
			Effect.andThen((response) => response.data),
			Effect.filterOrFail(
				(profile) => profile === null,
				() => "/dashboard",
			),
			Effect.orElseSucceed(() => Schema.Void),
		);
	}).pipe(Effect.provide(SupabaseServerClient.Live), Effect.provide(ServerEnv.Live), Effect.runPromiseExit);

	if (Exit.isFailure(result)) {
		Cause.match(result.cause, {
			onDie: () => redirect("/login"),
			onEmpty: () => {},
			onFail: (fail) => redirect(typeof fail === "string" ? fail : "/login"),
			onInterrupt: () => redirect("/login"),
			onParallel: () => redirect("/login"),
			onSequential: () => redirect("/login"),
		});
	}
	return <>{children}</>;
}
