import { FetchHttpClient } from "@effect/platform";
import { RpcClient, RpcSerialization } from "@effect/rpc";
import { AtomRpc } from "@effect-atom/atom-react";
import { Context, Effect, Layer, Redacted } from "effect";
import { ServerEnv } from "@/lib/env/server";
import { Rpcs } from "@/rpc/procedures/definitions";

export class Protocol extends Context.Tag("@honey-pot/src/rpc/client/server/Protocol")<Protocol, RpcClient.Protocol>() {
	static Live = Layer.unwrapEffect(
		Effect.gen(function* () {
			const { VercelUrl } = yield* ServerEnv;
			return RpcClient.layerProtocolHttp({
				url: `${Redacted.value(VercelUrl)}/api/rpc`,
			}).pipe(Layer.provide([FetchHttpClient.layer, RpcSerialization.layerJson]));
		}).pipe(Effect.provide(ServerEnv.Live)),
	);

	static Test = RpcClient.layerProtocolHttp({
		url: "http://localhost:3002/api/rpc",
	}).pipe(Layer.provide([FetchHttpClient.layer, RpcSerialization.layerJson]));
}

export class ServerRpcClient extends AtomRpc.Tag<ServerRpcClient>()(
	"@honey-pot/src/rpc/client/browser/ServerRpcClient",
	{
		group: Rpcs,
		protocol: Protocol.Live,
	},
) {}
