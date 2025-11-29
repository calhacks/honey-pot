import { HttpServer } from "@effect/platform";
import { RpcSerialization, RpcServer } from "@effect/rpc";
import { Layer } from "effect";
import { AdminUserMiddleware, AuthenticatedUserMiddleware } from "@/rpc/middleware/middleware";
import { Procedures } from "@/rpc/procedures";
import { Rpcs } from "@/rpc/procedures/definitions";

export const { handler, dispose } = RpcServer.toWebHandler(Rpcs, {
	layer: Layer.mergeAll(
		Procedures,
		AdminUserMiddleware,
		AuthenticatedUserMiddleware,
		RpcSerialization.layerJson,
		HttpServer.layerContext,
	),
});
