"use client";

import { Rpc, rpc } from "@/rpc/client";
import type { EmailSendOtpError, EmailSendOtpPayload, EmailSendOtpSuccess } from "@/rpc/rpc/login";
import { useEffectMutationSWR } from "./use-effect-swr";

const UseEmailSendOtpKey = "use-email-send-otp";

export function useEmailSendOtp() {
	return useEffectMutationSWR<EmailSendOtpSuccess, EmailSendOtpError, EmailSendOtpPayload>(
		UseEmailSendOtpKey,
		(payload) => rpc(Rpc.EmailSendOtp(payload)),
	);
}

export function useEmailEnterOtp() {}
