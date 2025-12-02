import { HttpServer } from "@effect/platform";
import { RpcSerialization, RpcServer } from "@effect/rpc";
import { Layer } from "effect";
import { RateLimiterMiddleware } from "@/rpc/middleware/rate-limit/layer";
import { AdminUserMiddleware, AuthenticatedUserMiddleware } from "@/rpc/middleware/role/layer";
import { Procedures } from "@/rpc/procedures";
import { Rpcs } from "@/rpc/procedures/definitions";

export const { handler, dispose } = RpcServer.toWebHandler(Rpcs, {
	layer: Layer.mergeAll(
		Procedures,
		AdminUserMiddleware,
		AuthenticatedUserMiddleware,
		RateLimiterMiddleware,
		RpcSerialization.layerJson,
		HttpServer.layerContext,
	),
});
