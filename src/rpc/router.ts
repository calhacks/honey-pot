import { HttpServer } from "@effect/platform";
import { RpcSerialization, RpcServer } from "@effect/rpc";
import { Layer } from "effect";
import { AuthenticatedUserMiddleware } from "@/rpc/middleware/middleware";
import { Procedures } from "@/rpc/procedures";
import { Rpcs } from "@/rpc/rpc";

export const { handler, dispose } = RpcServer.toWebHandler(Rpcs, {
	layer: Layer.mergeAll(Procedures, AuthenticatedUserMiddleware, RpcSerialization.layerJson, HttpServer.layerContext),
});
