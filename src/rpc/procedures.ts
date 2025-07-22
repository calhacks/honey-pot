import { Effect } from "effect";
import { ProfileRpcs } from "@/schema/rpc";

export const ProfileProcedures = ProfileRpcs.toLayer({
    "@honey-pot/schema/rpc/ProfileRpcs/GetAllProfiles": (request) => Effect.gen(function* () {
        return yield* Effect.succeed([]);
    }),

    "@honey-pot/schema/rpc/ProfileRpcs/GetProfileById": (request) => Effect.gen(function* () {
        return yield* Effect.succeed({
            id: "1",
            user_id: "1",
            created_at: new Date(),
            updated_at: new Date(),
            role: "admin" as const,
            avatar_url: null,
        });
    }),

    "@honey-pot/schema/rpc/ProfileRpcs/InsertProfile": (request) => Effect.gen(function* () {
        return yield* Effect.succeed({
            id: "1",
            user_id: "1",
            created_at: new Date(),
            updated_at: new Date(),
            role: "admin" as const,
            avatar_url: null,
        });
    }),

    "@honey-pot/schema/rpc/ProfileRpcs/UpdateProfile": (request) => Effect.gen(function* () {
        return yield* Effect.succeed({
            id: "1",
            user_id: "1",
            created_at: new Date(),
            updated_at: new Date(),
            role: "admin" as const,
            avatar_url: null,
        });
    }),

    "@honey-pot/schema/rpc/ProfileRpcs/DeleteProfile": (request) => Effect.gen(function* () {
        return yield* Effect.succeed([]);
    }),
});