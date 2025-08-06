"use client";

import { Effect } from "effect";
import { useEffect, useState } from "react";
import { Rpc } from "@/rpc/client";
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
		}).pipe(Effect.provide(Rpc.Default), Effect.runPromise);
	}, []);

	return profiles;
}
