import { Effect } from "effect";
import { ProfileRpcs } from "@/schema/rpc";

export const ProfileProcedures = ProfileRpcs.toLayer({
    GetAllProfiles: (request) => Effect.gen(function* () {
        return yield* Effect.succeed([]);
    }).pipe(Effect.withSpan("@honey-pot/rpc/procedures/GetAllProfiles")),

    GetProfileById: (request) => Effect.gen(function* () {
        return yield* Effect.succeed({
            id: "1",
            user_id: "1",
            created_at: new Date(),
            updated_at: new Date(),
            role: "admin" as const,
            avatar_url: null,
        });
    }).pipe(Effect.withSpan("@honey-pot/rpc/procedures/GetProfileById")),

    InsertProfile: (request) => Effect.gen(function* () {
        return yield* Effect.succeed({
            id: "1",
            user_id: "1",
            created_at: new Date(),
            updated_at: new Date(),
            role: "admin" as const,
            avatar_url: null,
        });
    }).pipe(Effect.withSpan("@honey-pot/rpc/procedures/InsertProfile")),

    UpdateProfile: (request) => Effect.gen(function* () {
        return yield* Effect.succeed({
            id: "1",
            user_id: "1",
            created_at: new Date(),
            updated_at: new Date(),
            role: "admin" as const,
            avatar_url: null,
        });
    }).pipe(Effect.withSpan("@honey-pot/rpc/procedures/UpdateProfile")),

    DeleteProfile: (request) => Effect.gen(function* () {
        return yield* Effect.succeed([]);
    }).pipe(Effect.withSpan("@honey-pot/rpc/procedures/DeleteProfile")),
});