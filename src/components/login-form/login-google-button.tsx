"use client";

import { useAtomSet } from "@effect-atom/atom-react";
import { Exit } from "effect";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/tailwind/utils";
import { BrowserRpcClient } from "@/rpc/client/browser";

interface LoginButtonProps {
	className?: string;
}

export function LoginGoogleButton(props: LoginButtonProps) {
	const googleLogin = useAtomSet(BrowserRpcClient.mutation("GoogleOAuthLogin"), { mode: "promiseExit" });

	return (
		<Button
			onClick={async () => {
				const loginResult = await googleLogin({ payload: {}, reactivityKeys: ["google-oauth-login"] });
				Exit.match(loginResult, {
					onFailure: () => toast.error("Could not reach Google"),
					onSuccess: (url) => window.location.assign(url),
				});
			}}
			variant="outline"
			className={cn(props.className)}
		>
			Continue with Google
		</Button>
	);
}
