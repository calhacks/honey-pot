"use client";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useGoogleOAuth } from "@/hooks/use-login";
import { cn } from "@/lib/tailwind/utils";

interface LoginButtonProps {
	className?: string;
}

export function LoginGoogleButton(props: LoginButtonProps) {
	const { trigger: initiateGoogleOAuthLogin } = useGoogleOAuth();

	return (
		<Button
			onClick={() =>
				initiateGoogleOAuthLogin({
					onSuccess: (redirectUrl) => {
						window.location.assign(redirectUrl);
					},
					onError: (error) => {
						console.error(error);
						toast.error("Error");
					},
				})
			}
			variant="outline"
			className={cn(props.className)}
		>
			Continue with Google
		</Button>
	);
}
