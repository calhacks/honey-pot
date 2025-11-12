import { Effect, Schema as S } from "effect";
import { redirect } from "next/navigation";
import type { NextRequest } from "next/server";
import { SupabaseServerClient } from "@/lib/supabase/client/server";
import { NodeTracer } from "@/lib/tracing/spans";

const SupabaseEmailOtpType = S.Literal("signup", "invite", "magiclink", "recovery", "email_change", "email");

export const GET = async (request: NextRequest) => {
	const redirectUrl = await Effect.gen(function* () {
		const { searchParams } = new URL(request.url);

		const tokenHash = yield* Effect.fromNullable(searchParams.get("token_hash"));
		const type = yield* Effect.fromNullable(searchParams.get("type")).pipe(
			Effect.flatMap(S.decodeUnknown(SupabaseEmailOtpType)),
		);
		const next = yield* Effect.fromNullable(searchParams.get("next")).pipe(Effect.orElseSucceed(() => "/"));

		if (tokenHash && type) {
			const supabase = yield* SupabaseServerClient;

			const { error } = yield* Effect.tryPromise(() =>
				supabase.auth.verifyOtp({
					type,
					token_hash: tokenHash,
				}),
			);

			if (!error) {
				return next;
			}
		}

		return "/login";
	}).pipe(Effect.provide(SupabaseServerClient.Default), Effect.provide(NodeTracer), Effect.runPromise);

	return redirect(redirectUrl);
};
