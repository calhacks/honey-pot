"use client";

import { FetchHttpClient } from "@effect/platform";
import { RpcClient, RpcSerialization } from "@effect/rpc";
import { AtomRpc } from "@effect-atom/atom-react";
import { Console, Effect, Layer, Redacted } from "effect";
import { ClientEnv } from "@/lib/env/client";
import { Rpcs } from "@/rpc/procedures/definitions";

const Protocol = Layer.unwrapEffect(
	Effect.gen(function* () {
		const { NextPublicVercelUrl } = yield* ClientEnv;
		return RpcClient.layerProtocolHttp({
			url: `${Redacted.value(NextPublicVercelUrl)}/api/rpc`,
		});
	}).pipe(Effect.tapErrorCause(Console.error), Effect.provide(ClientEnv.Default)),
);

export class BrowserRpcClient extends AtomRpc.Tag<BrowserRpcClient>()(
	"@honey-pot/src/rpc/client/browser/BrowserRpcClient",
	{
		group: Rpcs,
		protocol: Protocol.pipe(Layer.provide([FetchHttpClient.layer, RpcSerialization.layerJson])),
	},
) {}
