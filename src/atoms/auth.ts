import { BrowserRpcClient } from "@/rpc/client/browser";

export const SendMagicLinkAtom = BrowserRpcClient.mutation("SendMagicLink");

export const GoogleOAuthLoginAtom = BrowserRpcClient.mutation("GoogleOAuthLogin");

export const SignOutAtom = BrowserRpcClient.mutation("SignOut");
