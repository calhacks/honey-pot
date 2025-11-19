"use client";

import { Result, useAtomValue } from "@effect-atom/atom-react";
import { Client } from "@/rpc/client/browser";

export default function Home() {
	const currentProfile = useAtomValue(
		Client.query(
			"GetProfileById",
			{ id: "136791c4-4d80-41f3-8821-ce55ac0f6e39" },
			{ reactivityKeys: ["get-profile-by-id"] },
		),
	);

	return (
		<div>
			<h1>Profiles</h1>
			<pre>
				{JSON.stringify(
					Result.getOrElse(currentProfile, () => null),
					null,
					2,
				)}
			</pre>
		</div>
	);
}
