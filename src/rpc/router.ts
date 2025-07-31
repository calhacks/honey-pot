import { HttpServer } from "@effect/platform";
import { RpcSerialization, RpcServer } from "@effect/rpc";
import { Layer } from "effect";
import { Procedures } from "@/rpc/procedures";
import { Rpcs } from "@/rpc/rpc";

export const { handler, dispose } = RpcServer.toWebHandler(Rpcs, {
	layer: Layer.mergeAll(Procedures, RpcSerialization.layerJson, HttpServer.layerContext),
});
