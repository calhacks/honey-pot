import { FetchHttpClient } from "@effect/platform";
import { RpcClient, RpcSerialization } from "@effect/rpc";
import { Console, Context, Effect, Layer } from "effect";
import { Rpcs } from "@/rpc/procedures/definitions";

export class Protocol extends Context.Tag("@honey-pot/src/rpc/client/server/Protocol")<Protocol, RpcClient.Protocol>() {
	static Live = RpcClient.layerProtocolHttp({
		url: "/api/rpc",
	}).pipe(Layer.provide([FetchHttpClient.layer, RpcSerialization.layerJson]));

	static Test = RpcClient.layerProtocolHttp({
		url: "http://localhost:3002/api/rpc",
	}).pipe(Layer.provide([FetchHttpClient.layer, RpcSerialization.layerJson]));
}

export const Rpc = Effect.serviceFunctions(RpcClient.make(Rpcs));

export class RpcProvider extends Context.Tag("@honey-pot/src/rpc/client/server/RpcProvider")<RpcProvider, void>() {
	static Live = <A, E, R>(_: Effect.Effect<A, E, R>) => {
		_.pipe(Effect.tapErrorCause(Console.error), Effect.provide(Protocol.Live), Effect.scoped);
	};

	static Test = <A, E, R>(_: Effect.Effect<A, E, R>) => {
		_.pipe(Effect.tapErrorCause(Console.error), Effect.provide(Protocol.Test), Effect.scoped);
	};
}
