import { HttpServer } from '@effect/platform';
import { RpcSerialization, RpcServer } from '@effect/rpc';
import { Layer } from 'effect';
import { ProfileProcedures } from '@/rpc/procedures';
import { ProfileRpcs } from '@/schema/rpc';

export const { handler, dispose } = RpcServer.toWebHandler(ProfileRpcs, {
    layer: Layer.mergeAll(
        ProfileProcedures,
        RpcSerialization.layerJson,
        HttpServer.layerContext,
    )
})