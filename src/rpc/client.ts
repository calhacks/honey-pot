"use client";

import { FetchHttpClient } from "@effect/platform";
import { RpcClient, RpcSerialization } from "@effect/rpc";
import { Effect, Layer } from "effect";
import { Env } from "@/lib/env";
import { ProfileRpcs } from "@/schema/rpc";

export const ProtocolLive = Layer.unwrapEffect(
    Effect.gen(function* () {
        const { nextPublicHost } = yield* Env;
        return RpcClient.layerProtocolHttp({
            url: nextPublicHost,
        });
    })
).pipe(Layer.provide([Env.Default, FetchHttpClient.layer, RpcSerialization.layerNdjson]));


export class Rpc extends Effect.Service<Rpc>()("@honey-pot/rpc/client/Rpc", {
    scoped: RpcClient.make(ProfileRpcs),
    dependencies: [ProtocolLive]
}) { }

export const Live = Layer.mergeAll(
    ProtocolLive,
    Rpc.Default,
);