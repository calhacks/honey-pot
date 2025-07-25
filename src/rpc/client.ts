import { FetchHttpClient } from "@effect/platform";
import { RpcClient, RpcSerialization } from "@effect/rpc";
import { Effect, Layer, Redacted } from "effect";
import { Env } from "@/lib/env";
import { ProfileRpcs } from "@/schema/rpc";

export class Protocol extends Effect.Service<Protocol>()("@honey-pot/Protocol", {
    effect: Effect.gen(function* () {
        const { nextPublicHost } = yield* Env;
        const host = Redacted.value(nextPublicHost);

        return RpcClient.layerProtocolHttp({
            url: host,
        });
    }),

    dependencies: [
        Env.Default,
        FetchHttpClient.layer,
        RpcSerialization.layerNdjson
    ]
}) { }

export class Rpc extends Effect.Service<Rpc>()("@honey-pot/rpc/client/Rpc", {
    effect: Effect.gen(function* () {
        return Effect.succeed("test");
    })
}) { }

export const Live = Layer.mergeAll(
    Env.Default,
    FetchHttpClient.layer,
    RpcSerialization.layerNdjson,
    Protocol.Default,
    Rpc.Default
);