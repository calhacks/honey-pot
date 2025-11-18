"use client";

import { useGetAllEvents } from "@/hooks/use-events";

export default function EventDropdown() {
	const { data: events } = useGetAllEvents();
	console.log(events);

	return <>{JSON.stringify(events, null, 2)}</>;
}
