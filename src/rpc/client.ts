"use client";

import { FetchHttpClient } from "@effect/platform";
import { RpcClient, RpcSerialization } from "@effect/rpc";
import { Effect, Layer, Redacted } from "effect";
import { ClientEnv } from "@/lib/env/client";
import { ProfileRpcs } from "@/schema/rpc";

export const ProtocolLive = Layer.unwrapEffect(
	Effect.gen(function* () {
		const { NextPublicHost } = yield* ClientEnv;
		return RpcClient.layerProtocolHttp({
			url: `${Redacted.value(NextPublicHost)}/api/rpc`,
		});
	}),
).pipe(Layer.provide([FetchHttpClient.layer, RpcSerialization.layerJson]));

export class Rpc extends Effect.Service<Rpc>()("@honey-pot/rpc/client/Rpc", {
	scoped: RpcClient.make(ProfileRpcs),
	dependencies: [ProtocolLive],
}) {}

export const Live = Layer.mergeAll(ProtocolLive, Rpc.Default);
