"use client";

import { FetchHttpClient } from "@effect/platform";
import { RpcClient, RpcSerialization } from "@effect/rpc";
import { AtomRpc } from "@effect-atom/atom-react";
import { Layer } from "effect";
import { Rpcs } from "@/rpc/procedures/definitions";

export class Client extends AtomRpc.Tag<Client>()("@honey-pot/src/rpc/client/browser/Client", {
	group: Rpcs,
	protocol: RpcClient.layerProtocolHttp({
		url: "/api/rpc",
	}).pipe(Layer.provide([FetchHttpClient.layer, RpcSerialization.layerJson])),
}) {}
