"use client";

import { useEffectMutationSWR } from "@/hooks/use-effect-swr";
import { Rpc, rpc } from "@/rpc/client/browser";
import type { GoogleOAuthLoginPayload, SendMagicLinkPayload } from "@/rpc/procedures/login/schema";

const SendMagicLinkKey = "send-magic-link";
const GoogleOAuthKey = "google-oauth";

export function useSendMagicLink() {
	return useEffectMutationSWR(SendMagicLinkKey, (payload: SendMagicLinkPayload) => rpc(Rpc.SendMagicLink(payload)));
}

export function useGoogleOAuth() {
	return useEffectMutationSWR(GoogleOAuthKey, (payload: GoogleOAuthLoginPayload) =>
		rpc(Rpc.GoogleOAuthLogin(payload)),
	);
}
