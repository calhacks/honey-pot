import { Schema } from "effect";

export function OnboardingForm() {}

const OnboardingFormSchema = Schema.Struct({
	email: Schema.String.pipe(
		Schema.nonEmptyString({ message: () => "Email is required" }),
		Schema.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, { message: () => "Invalid email address" }),
	),
});
type OnboardingForm = typeof OnboardingFormSchema.Type;
