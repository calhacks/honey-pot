"use client";

import { Console, Effect } from "effect";
import { useEffect, useState } from "react";
import { Rpc, rpc } from "@/rpc/client";
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
		rpc(Rpc.GetAllProfiles({})).pipe(
			Effect.tap((result) => setProfiles(result)),
			Effect.runPromise,
		);
	}, []);

	return profiles;
}
