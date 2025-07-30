import { Button } from "@/components/ui/button";
import { cn } from "@/lib/tailwind/utils";

interface LoginButtonProps {
	provider: {
		name: string;
	};
	className?: string;
}

export function LoginButton(props: LoginButtonProps) {
	return (
		<Button variant="outline" className={cn(props.className)}>
			Continue with {props.provider.name}
		</Button>
	);
}
