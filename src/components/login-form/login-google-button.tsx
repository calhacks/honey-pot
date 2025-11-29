"use client";

import { useAtomSet } from "@effect-atom/atom-react";
import { Exit } from "effect";
import { toast } from "sonner";
import { GoogleOAuthLoginAtom } from "@/atoms/auth";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/tailwind/utils";

interface LoginButtonProps {
	className?: string;
}

export function LoginGoogleButton(props: LoginButtonProps) {
	const googleLogin = useAtomSet(GoogleOAuthLoginAtom, { mode: "promiseExit" });

	return (
		<Button
			onClick={async () => {
				const loginResult = await googleLogin({ payload: {} });
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
