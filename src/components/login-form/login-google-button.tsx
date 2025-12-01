"use client";

import { useAtomSet } from "@effect-atom/atom-react";
import { IconBrandGoogleFilled } from "@tabler/icons-react";
import { Exit } from "effect";
import { toast } from "sonner";
import { GoogleOAuthLoginAtom } from "@/atoms/auth";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/tailwind/utils";

type LoginButtonProps = {
	className?: string;
} & React.ComponentProps<"button">;

export function LoginGoogleButton({ className, ...props }: LoginButtonProps) {
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
			className={cn(className)}
			{...props}
		>
			<IconBrandGoogleFilled className="size-4 fill-accent-foreground" /> Continue with Google
		</Button>
	);
}
