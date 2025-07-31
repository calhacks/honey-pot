"use client";

import { Effect } from "effect";
import useSWRMutation from "swr/mutation";
import { Rpc } from "@/rpc/client";
import type { LoginPayload } from "@/schema/rpc/login";

const UseEmailLoginKey = "use-email-login";

export function useEmailLogin() {
	async function emailLogin(payload: LoginPayload) {
		return Effect.gen(function* () {
			const rpc = yield* Rpc;
			return yield* rpc.EmailLogin(payload);
		}).pipe(Effect.provide(Rpc.Default), Effect.runPromise);
	}

	return useSWRMutation<ReturnType<typeof emailLogin>, Error, typeof UseEmailLoginKey, LoginPayload>(
		UseEmailLoginKey,
		(_, { arg }) => emailLogin(arg),
	);
}
