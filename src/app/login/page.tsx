import LoginForm from "@/components/login-form/login-form";

export default function LoginPage() {
	return (
		<main className="flex min-h-svh flex-col items-center justify-center bg-background">
			<div className="w-full max-w-sm">
				<LoginForm />
			</div>
		</main>
	);
}
