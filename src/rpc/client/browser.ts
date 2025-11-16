"use client";

import { FetchHttpClient } from "@effect/platform";
import { RpcClient, RpcSerialization } from "@effect/rpc";
import { Effect, Layer } from "effect";
import { Rpcs } from "@/rpc/rpc";

const ProtocolLive = RpcClient.layerProtocolHttp({
	url: "/api/rpc",
}).pipe(Layer.provide([FetchHttpClient.layer, RpcSerialization.layerJson]));

export const Rpc = Effect.serviceFunctions(RpcClient.make(Rpcs));

export function rpc<A, E, R>(result: Effect.Effect<A, E, R>) {
	return result.pipe(Effect.provide(ProtocolLive), Effect.scoped);
}
