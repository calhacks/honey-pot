"use client";

import { effectTsResolver } from "@hookform/resolvers/effect-ts";
import { Schema as S } from "effect";
import Image from "next/image";
import { useForm } from "react-hook-form";
import Logo from "@/app/assets/images/logo.svg";
import { LoginButton } from "@/components/login-form/login-button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

export default function LoginForm() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<EmailForm>({
		resolver: effectTsResolver(EmailFormSchema),
	});

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

			<form onSubmit={handleSubmit(onSubmit)}>
				<Input {...register("email", { required: true })} />
			</form>
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
