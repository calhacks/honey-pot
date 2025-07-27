"use client";

import { Effect } from "effect";
import { useEffect, useState } from "react";
import { Live, Rpc } from "@/rpc/client";
import type { Profile } from "@/schema/supabase";


export default function Home() {
    const profiles = useGetAllProfiles();
    return (
        <div>
            <h1>Profiles</h1>
            <pre>{JSON.stringify(profiles, null, 2)}</pre>

            <button
                type="button"
                onClick={() => Effect.runPromise(useInsertProfile.pipe(Effect.provide(Live)))}
            >Insert Profile</button>
        </div>
    );
}

function useGetAllProfiles() {
    const [profiles, setProfiles] = useState<readonly Profile.Profile[]>([]);

    useEffect(() => {
        const program = Effect.gen(function* () {
            const rpc = yield* Rpc;
            return yield* rpc.GetAllProfiles({});
        });

        Effect.runPromise(program.pipe(Effect.provide(Live)))
            .then((profiles) => setProfiles(profiles))
            .catch((e) => console.error("RPC error", JSON.stringify(e, null, 2)));
    }, []);

    return profiles;
}

const useInsertProfile = Effect.gen(function* () {
    const rpc = yield* Rpc;
    return yield* rpc.InsertProfile({
        id: "1",
        user_id: "1",
        created_at: new Date(),
        updated_at: new Date(),
        role: "admin",
        avatar_url: null,
    });
});