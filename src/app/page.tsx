"use client";

import { useGetCurrentProfile } from "@/hooks/use-profile";

export default function Home() {
	const { data: currentProfile } = useGetCurrentProfile({ id: "136791c4-4d80-41f3-8821-ce55ac0f6e39" });

	return (
		<div>
			<h1>Profiles</h1>
			<pre>{JSON.stringify(currentProfile, null, 2)}</pre>
		</div>
	);
}
