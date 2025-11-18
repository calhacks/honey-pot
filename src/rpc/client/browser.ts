"use client";

import { FetchHttpClient } from "@effect/platform";
import { RpcClient, RpcSerialization } from "@effect/rpc";
import { Console, Effect, Layer } from "effect";
import { Rpcs } from "@/rpc/procedures/definitions";

const ProtocolLive = RpcClient.layerProtocolHttp({
	url: "/api/rpc",
}).pipe(Layer.provide([FetchHttpClient.layer, RpcSerialization.layerJson]));

export const Rpc = Effect.serviceFunctions(RpcClient.make(Rpcs));

export function rpc<A, E, R>(result: Effect.Effect<A, E, R>) {
	return result.pipe(Effect.tapErrorCause(Console.error), Effect.provide(ProtocolLive), Effect.scoped);
}
