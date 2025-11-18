"use client";

import { useEffectSWR } from "@/hooks/use-effect-swr";
import { Rpc, rpc } from "@/rpc/client/browser";

const GetAllEventsKey = "get-all-events";

export function useGetAllEvents() {
	return useEffectSWR(GetAllEventsKey, () => rpc(Rpc.GetAllEvents({})));
}
