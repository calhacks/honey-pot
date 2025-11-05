"use client";

import { FetchHttpClient } from "@effect/platform";
import { RpcClient, RpcSerialization } from "@effect/rpc";
import { Effect, Layer, Redacted } from "effect";
import { ClientEnv } from "@/lib/env/client";
import { Rpcs } from "@/rpc/rpc";

export const ProtocolLive = Layer.unwrapEffect(
	Effect.gen(function* () {
		const { NextPublicVercelUrl } = yield* ClientEnv;
		return RpcClient.layerProtocolHttp({
			url: `${Redacted.value(NextPublicVercelUrl)}/api/rpc`,
		});
	}),
).pipe(Layer.provide([ClientEnv.Default, FetchHttpClient.layer, RpcSerialization.layerJson]));

export const Rpc = Effect.serviceFunctions(RpcClient.make(Rpcs));

export function rpc<A, E, R>(result: Effect.Effect<A, E, R>) {
	return result.pipe(Effect.provide(ProtocolLive), Effect.scoped);
}
