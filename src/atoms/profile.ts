import { ServerRpcClient } from "@/rpc/client/server";

const GetCurrentProfileKey = "get-current-profile";

export const GetCurrentProfileAtom = ServerRpcClient.query(
	"GetCurrentProfile",
	{},
	{ reactivityKeys: [GetCurrentProfileKey] },
);
