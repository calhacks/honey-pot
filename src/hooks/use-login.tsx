"use client";

import { useEffectMutationSWR } from "@/hooks/use-effect-swr";
import { Rpc, rpc } from "@/rpc/client";
import type { GoogleOAuthLoginPayload, SendMagicLinkPayload } from "@/rpc/rpc/login";

const UseSendMagicLinkKey = "use-send-magic-link";
const UseGoogleOAuthKey = "use-google-oauth";

export function useSendMagicLink() {
	return useEffectMutationSWR(UseSendMagicLinkKey, (payload: SendMagicLinkPayload) =>
		rpc(Rpc.SendMagicLink(payload)),
	);
}

export function useGoogleOAuth() {
	return useEffectMutationSWR(UseGoogleOAuthKey, (payload: GoogleOAuthLoginPayload) =>
		rpc(Rpc.GoogleOAuthLogin(payload)),
	);
}
