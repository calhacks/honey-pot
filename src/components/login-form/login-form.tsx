"use client";

import { effectTsResolver } from "@hookform/resolvers/effect-ts";
import { Cause, Schema as S } from "effect";
import Image from "next/image";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import Logo from "@/app/assets/images/logo.svg";
import { useEmailSendOtp } from "@/app/hooks/use-login";
import { LoginButton } from "@/components/login-form/login-button";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

export default function LoginForm() {
	const { trigger: emailSendOtp } = useEmailSendOtp();

	const form = useForm<EmailForm>({
		resolver: effectTsResolver(EmailFormSchema),
		defaultValues: {
			email: "",
		},
	});

	async function onSubmit(emailForm: EmailForm) {
		await emailSendOtp({
			email: emailForm.email,
			onSuccess: (data) => console.log(data),
			onError: (error) =>
				form.setError("email", {
					message: error.message,
				}),
		});
	}

	return (
		<div className="flex flex-col gap-5 sm:w-[300px]">
			<div className="flex flex-col items-center gap-4">
				<Image src={Logo} alt="Hackathons at Berkeley logo" height={50} />
				<span className="font-sf font-semibold sm:text-2xl text-slate-800">Application Portal</span>
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
						Log in
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
