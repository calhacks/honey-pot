"use client";

import { useAtomSet } from "@effect-atom/atom-react";
import { effectTsResolver } from "@hookform/resolvers/effect-ts";
import { Exit, Schema } from "effect";
import Image from "next/image";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import Logo from "@/assets/images/logo.svg";
import { SendMagicLinkAtom } from "@/atoms/auth";
import { GoogleLoginButton } from "@/components/buttons/google-login";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel, FieldSeparator } from "@/components/ui/field";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";

export default function LoginForm() {
	const sendMagicLink = useAtomSet(SendMagicLinkAtom, { mode: "promiseExit" });

	const form = useForm<EmailForm>({
		resolver: effectTsResolver(EmailFormSchema),
		defaultValues: {
			email: "",
		},
	});

	async function submitEmail(emailForm: EmailForm) {
		const magicLinkResult = await sendMagicLink({
			payload: { email: emailForm.email },
		});

		Exit.match(magicLinkResult, {
			onFailure: () =>
				form.setError("email", {
					message: "Error sending OTP. Please try again.",
				}),
			onSuccess: () => toast.success("Sent"),
		});
	}

	return (
		<Form {...form}>
			<form id="login-form" onSubmit={form.handleSubmit(submitEmail)} className="flex flex-col gap-6">
				<FieldGroup>
					<div className="flex flex-col items-center gap-2">
						<Image src={Logo} alt="Hackathons at Berkeley logo" height={60} />
					</div>
				</FieldGroup>

				<Controller
					name="email"
					control={form.control}
					render={({ field, fieldState }) => (
						<Field aria-invalid={fieldState.invalid}>
							<FieldLabel htmlFor="login-form-email">Email</FieldLabel>
							<Input
								{...field}
								id="login-form-email"
								type="email"
								aria-invalid={fieldState.invalid}
								placeholder="oski@berkeley.edu"
								required
							/>
							{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
						</Field>
					)}
				/>

				<Field>
					<Button type="submit" form="login-form" disabled={form.formState.isSubmitting}>
						{form.formState.isSubmitting ? <Spinner /> : "Create Account"}
					</Button>
				</Field>

				<FieldSeparator>Or</FieldSeparator>

				<GoogleLoginButton type="button" />
			</form>
		</Form>
	);
}

const EmailFormSchema = Schema.Struct({
	email: Schema.String.pipe(
		Schema.nonEmptyString({ message: () => "Email is required" }),
		Schema.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, { message: () => "Invalid email address" }),
	),
});
type EmailForm = typeof EmailFormSchema.Type;
