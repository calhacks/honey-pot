"use client";

import { useAtomSet } from "@effect-atom/atom-react";
import { effectTsResolver } from "@hookform/resolvers/effect-ts";
import { Exit, Schema } from "effect";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import Logo from "@/assets/images/logo.svg";
import { LoginGoogleButton } from "@/components/login-form/login-google-button";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import { Client } from "@/rpc/client/browser";

export default function LoginForm() {
	const sendMagicLink = useAtomSet(Client.mutation("SendMagicLink"), { mode: "promiseExit" });

	const form = useForm<EmailForm>({
		resolver: effectTsResolver(EmailFormSchema),
		defaultValues: {
			email: "",
		},
	});

	async function onSubmit(emailForm: EmailForm) {
		const magicLinkResult = await sendMagicLink({
			payload: { email: emailForm.email },
			reactivityKeys: ["send-magic-link"],
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
		<Card className="w-full max-w-sm">
			<CardHeader className="place-items-center gap-4">
				<Image src={Logo} alt="Hackathons at Berkeley logo" height={50} />
				<CardTitle className="font-sf font-semibold sm:text-2xl text-center text-balance">
					Event Portal
				</CardTitle>
			</CardHeader>

			<CardContent className="flex flex-col gap-5">
				<div className="flex flex-col items-center gap-2">
					<LoginGoogleButton className="w-full" />
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

						<Button
							type="submit"
							variant="default"
							disabled={form.formState.isSubmitting}
							className="w-full"
						>
							{form.formState.isSubmitting ? <Spinner /> : "Log in"}
						</Button>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
}

const EmailFormSchema = Schema.Struct({
	email: Schema.String.pipe(
		Schema.nonEmptyString({ message: () => "Email is required" }),
		Schema.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, { message: () => "Invalid email address" }),
	),
});
type EmailForm = typeof EmailFormSchema.Type;
