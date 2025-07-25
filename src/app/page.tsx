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
            .catch((e) => console.error("RPC error", e));
    }, []);

    return profiles;
}