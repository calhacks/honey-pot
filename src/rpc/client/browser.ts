"use client";

import { FetchHttpClient } from "@effect/platform";
import { RpcClient, RpcSerialization } from "@effect/rpc";
import { AtomRpc } from "@effect-atom/atom-react";
import { Layer } from "effect";
import { Rpcs } from "@/rpc/procedures/definitions";

const Protocol = RpcClient.layerProtocolHttp({
	url: "/api/rpc",
});

export class BrowserRpcClient extends AtomRpc.Tag<BrowserRpcClient>()(
	"@honey-pot/src/rpc/client/browser/BrowserRpcClient",
	{
		group: Rpcs,
		protocol: Protocol.pipe(Layer.provide([FetchHttpClient.layer, RpcSerialization.layerJson])),
	},
) {}
