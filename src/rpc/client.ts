"use client";

import { FetchHttpClient } from "@effect/platform";
import { RpcClient, RpcSerialization } from "@effect/rpc";
import { Effect, Layer, Redacted } from "effect";
import { ClientEnv } from "@/lib/env/client";
import { Rpcs } from "@/rpc/rpc";

export const ProtocolLive = Layer.unwrapEffect(
	Effect.gen(function* () {
		const { NextPublicHost } = yield* ClientEnv;
		return RpcClient.layerProtocolHttp({
			url: `${Redacted.value(NextPublicHost)}/api/rpc`,
		});
	}),
).pipe(Layer.provide([FetchHttpClient.layer, RpcSerialization.layerJson]));

export const Rpc = Effect.serviceFunctions(RpcClient.make(Rpcs));

export function rpc<A, E, R>(result: Effect.Effect<A, E, R>) {
	return result.pipe(Effect.provide(ProtocolLive), Effect.scoped);
}
