"use client"

import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form } from "../ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import CustomFormField from "../CustomFormField"

export enum FormFieldTypes {
    INPUT = 'input',
    TEXTAREA = 'textarea',
    PHONE_INPUT = 'phoneInput',
    CHECKBOX = 'checkbox',
    DATE_PICKER = 'datePicker',
    SELECT = 'select',
    SKELETON = 'skeleton'
}


const formSchema = z.object({
    username: z.string().min(2).max(50),
})

const PatientForm = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
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

                <Button type="submit">Submit</Button>
            </form>
        </Form>
    )
}

export default PatientForm
