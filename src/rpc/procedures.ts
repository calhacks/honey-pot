import { Effect } from "effect";
import { ProfileRpcs } from "@/schema/rpc";

export const ProfileProcedures = ProfileRpcs.toLayer({
    GetAllProfiles: (request) => Effect.gen(function* () {
        return yield* Effect.succeed([]);
    }),

    GetProfileById: (request) => Effect.gen(function* () {
        return yield* Effect.succeed({
            id: "1",
            user_id: "1",
            created_at: new Date(),
            updated_at: new Date(),
            role: "admin" as const,
            avatar_url: null,
        });
    }),

    InsertProfile: (request) => Effect.gen(function* () {
        return yield* Effect.succeed({
            id: "1",
            user_id: "1",
            created_at: new Date(),
            updated_at: new Date(),
            role: "admin" as const,
            avatar_url: null,
        });
    }),

    UpdateProfile: (request) => Effect.gen(function* () {
        return yield* Effect.succeed({
            id: "1",
            user_id: "1",
            created_at: new Date(),
            updated_at: new Date(),
            role: "admin" as const,
            avatar_url: null,
        });
    }),

    DeleteProfile: (request) => Effect.gen(function* () {
        return yield* Effect.succeed([]);
    }),
});