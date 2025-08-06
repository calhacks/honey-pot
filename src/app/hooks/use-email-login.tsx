"use client";

import { Effect } from "effect";
import useSWRMutation from "swr/mutation";
import { Rpc } from "@/rpc/client";
import type { EmailLoginPayload } from "@/rpc/rpc/login";

const UseEmailLoginKey = "use-email-login";

export function useEmailLogin() {
	async function emailLogin(payload: EmailLoginPayload) {
		return Effect.gen(function* () {
			const rpc = yield* Rpc;
			return yield* rpc.EmailLogin(payload);
		}).pipe(Effect.provide(Rpc.Default), Effect.runPromiseExit);
	}

	return useSWRMutation<ReturnType<typeof emailLogin>, Error, typeof UseEmailLoginKey, EmailLoginPayload>(
		UseEmailLoginKey,
		(_, { arg }) => emailLogin(arg),
	);
}
