import { BrowserRpcClient } from "@/rpc/client/browser";
import { ServerRpcClient } from "@/rpc/client/server";

export const SendMagicLinkAtom = BrowserRpcClient.mutation("SendMagicLink");

export const GoogleOAuthLoginAtom = BrowserRpcClient.mutation("GoogleOAuthLogin");

export const SignOutAtom = ServerRpcClient.mutation("SignOut");
