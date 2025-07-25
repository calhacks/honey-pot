import { FetchHttpClient } from "@effect/platform";
import { RpcClient, RpcSerialization } from "@effect/rpc";
import { Effect, Layer, Redacted } from "effect";
import { Env } from "@/lib/env";
import { ProfileRpcs } from "@/schema/rpc";

export const ProtocolLive = Layer.unwrapEffect( 
    Effect.gen(function* () {
        const { nextPublicHost } = yield* Env;
        const host = Redacted.value(nextPublicHost);

        return RpcClient.layerProtocolHttp({
            url: host,
        });
    })
).pipe(Layer.provide([Env.Default, FetchHttpClient.layer, RpcSerialization.layerNdjson]));


export class Rpc extends Effect.Service<Rpc>()("@honey-pot/rpc/client/Rpc", {
    effect: Effect.gen(function* () {
        const rpc = yield* RpcClient.make(ProfileRpcs).pipe(Effect.scoped);
        return rpc;
    }),
    dependencies: [ProtocolLive]
}) { }

export const Live = Layer.mergeAll(
    Env.Default,
    Rpc.Default,
    FetchHttpClient.layer,
    RpcSerialization.layerNdjson,
);