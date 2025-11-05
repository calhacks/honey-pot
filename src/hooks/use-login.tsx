"use client";

import type { RpcClientError } from "@effect/rpc";
import { useEffectMutationSWR } from "@/hooks/use-effect-swr";
import { Rpc, rpc } from "@/rpc/client";
import type {
	GoogleOAuthLoginError,
	GoogleOAuthLoginPayload,
	GoogleOAuthLoginSuccess,
	SendMagicLinkError,
	SendMagicLinkPayload,
	SendMagicLinkSuccess,
} from "@/rpc/rpc/login";

const UseSendMagicLinkKey = "use-send-magic-link";
const UseGoogleOAuthKey = "use-google-oauth";

export function useSendMagicLink() {
	return useEffectMutationSWR<
		SendMagicLinkSuccess,
		SendMagicLinkError | RpcClientError.RpcClientError,
		SendMagicLinkPayload
	>(UseSendMagicLinkKey, (payload) => rpc(Rpc.SendMagicLink(payload)));
}

export function useGoogleOAuth() {
	return useEffectMutationSWR<
		GoogleOAuthLoginSuccess,
		GoogleOAuthLoginError | RpcClientError.RpcClientError,
		GoogleOAuthLoginPayload
	>(UseGoogleOAuthKey, (payload) => rpc(Rpc.GoogleOAuthLogin(payload)));
}
