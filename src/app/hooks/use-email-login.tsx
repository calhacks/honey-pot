"use client";

import { Effect } from "effect";
import { ClientEnv } from "@/lib/env/client";
import { Rpc } from "@/rpc/client";

const UseEmailLoginKey = "use-email-login";

export interface UseEmailLoginProps {
	email: string;
}

export function useEmailLogin(props: UseEmailLoginProps) {
	const fetcher = Effect.gen(function* () {
		const rpc = yield* Rpc;
		const { NextPublicHost } = yield* ClientEnv;
		return yield* rpc.EmailLogin({ email: props.email });
	});
}
