"use client"

import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form } from "../ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import CustomFormField from "../CustomFormField"
import SubmitButton from "../SubmitButton"
import { useState } from "react"
import { userFormValidation } from "@/lib/validation"
import { useRouter } from "next/navigation"

export enum FormFieldTypes {
    INPUT = 'input',
    TEXTAREA = 'textarea',
    PHONE_INPUT = 'phoneInput',
    CHECKBOX = 'checkbox',
    DATE_PICKER = 'datePicker',
    SELECT = 'select',
    SKELETON = 'skeleton'
}



const PatientForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter()

    const form = useForm<z.infer<typeof userFormValidation>>({
        resolver: zodResolver(userFormValidation),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
        },
    })

    async function onSubmit({ name, email, phone }: z.infer<typeof userFormValidation>) {
        setIsLoading(true);

        try {
            const userData = { name, email, phone };

            // TODO: Create user logic here...

        } catch (error) {
            console.error(error)
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
                <section className="mb-12 space-y-4">
                    <h1 className="header">Hi there 👋</h1>
                    <p className="text-gray-500">Schedule your first appointment</p>
                </section>

                {/* Full name */}
                <CustomFormField
                    fieldType={FormFieldTypes.INPUT}
                    control={form.control}
                    name='name'
                    label="Full name"
                    placeholder="John Smith"
                    iconSrc='/assets/icons/user.svg'
                    iconAlt='user'
                />

                {/* Email address */}
                <CustomFormField
                    fieldType={FormFieldTypes.INPUT}
                    control={form.control}
                    name='email'
                    label="Email"
                    placeholder="johnsmith@example.io"
                    iconSrc='/assets/icons/email.svg'
                    iconAlt='email'
                />

                {/* Phone Number */}
                <CustomFormField
                    fieldType={FormFieldTypes.PHONE_INPUT}
                    control={form.control}
                    name='phone'
                    label="Phone Number"
                    placeholder="(123) 456-7890"
                />

                <SubmitButton isLoading={isLoading}>Get in touch</SubmitButton>
            </form>
        </Form>
    )
}

export default PatientForm
