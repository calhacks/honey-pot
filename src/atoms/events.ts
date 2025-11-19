import { ServerRpcClient } from "@/rpc/client/server";

const GetAllEventsKey = "get-all-events";

export const GetAllEventsAtom = ServerRpcClient.query("GetAllEvents", {}, { reactivityKeys: [GetAllEventsKey] });
