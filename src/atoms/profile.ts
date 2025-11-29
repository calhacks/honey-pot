import { BrowserRpcClient } from "@/rpc/client/browser";

const GetCurrentProfileKey = "get-current-profile";

export const GetCurrentProfileAtom = BrowserRpcClient.query(
	"GetCurrentProfile",
	{},
	{ reactivityKeys: [GetCurrentProfileKey] },
);
