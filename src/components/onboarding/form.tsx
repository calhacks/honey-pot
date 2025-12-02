import { Schema } from "effect";
import { FileFromSelf } from "@/schema/lib";

export function OnboardingForm() {}

const OnboardingFormSchema = Schema.Struct({
	firstName: Schema.String.pipe(Schema.nonEmptyString({ message: () => "Enter first name" })),
	lastName: Schema.String.pipe(Schema.nonEmptyString({ message: () => "Enter last name" })),
	avatarUrl: Schema.optional(FileFromSelf),
});
type OnboardingForm = typeof OnboardingFormSchema.Type;
