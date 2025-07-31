"use client";

import { effectTsResolver } from "@hookform/resolvers/effect-ts";
import { Schema as S } from "effect";
import Image from "next/image";
import { useForm } from "react-hook-form";
import Logo from "@/app/assets/images/logo.svg";
import { useEmailLogin } from "@/app/hooks/use-email-login";
import { LoginButton } from "@/components/login-form/login-button";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

export default function LoginForm() {
	const { trigger: emailLogin } = useEmailLogin();

	const form = useForm<EmailForm>({
		resolver: effectTsResolver(EmailFormSchema),
		defaultValues: {
			email: "",
		},
	});

	async function onSubmit(emailForm: EmailForm) {
		await emailLogin({ email: emailForm.email });
	}

	return (
		<div className="flex flex-col gap-5 sm:w-[300px]">
			<div className="flex flex-col items-center gap-2">
				<Image src={Logo} alt="Hackathons at Berkeley logo" height={60} />
				<span className="font-sf font-semibold sm:text-2xl text-slate-800">Log in to your account</span>
			</div>

			<div className="flex flex-col items-center gap-2">
				<LoginButton provider={{ name: "Google" }} className="w-full" />
			</div>

			<Separator />

			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-3">
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input placeholder="oski@berkeley.edu" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<Button type="submit" variant="default" disabled={form.formState.isSubmitting} className="w-full">
						Login
					</Button>
				</form>
			</Form>
		</div>
	);
}

const EmailFormSchema = S.Struct({
	email: S.String.pipe(
		S.nonEmptyString({ message: () => "Email is required" }),
		S.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, { message: () => "Invalid email address" }),
	),
});
type EmailForm = S.Schema.Type<typeof EmailFormSchema>;
