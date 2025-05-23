"use client"

import { z } from "zod"
import { Form, FormControl } from "../ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { useState } from "react"
import { PatientFormValidation, UserFormValidation } from "../../../lib/validation"
import { useRouter } from "next/navigation"
import { createUser, registerPatient } from "../../../lib/actions/patient.actions"
import { FormFieldTypes } from "./PatientForm"

import CustomFormField from "../CustomFormField"
import SubmitButton from "../SubmitButton"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { Doctors, GenderOptions, IdentificationTypes, PatientFormDefaultValues } from "../../../constants"
import { Label } from "../ui/label"
import { SelectItem } from "../ui/select"
import Image from "next/image"
import FileUploader from "../FileUploader"

const RegisterForm = ({ user }: { user: User }) => {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter()

    const form = useForm<z.infer<typeof PatientFormValidation>>({
        resolver: zodResolver(PatientFormValidation),
        defaultValues: {
            ...PatientFormDefaultValues,
            name: user.name,
            email: user.email,
            phone: user.phone,
        },
    });

    async function onSubmit(values: z.infer<typeof PatientFormValidation>) {
        setIsLoading(true);

        let formData;

        // Check if there is an uploaded file
        if (values.identificationDocument && values.identificationDocument.length > 0) {
            const blobFile = new Blob([values.identificationDocument[0]], {
                type: values.identificationDocument[0].type
            })

            formData = new FormData();
            formData.append('blobFile', blobFile);
            formData.append('fileName', values.identificationDocument[0].name)
        }

        try {
            const patientData = {
                ...values,
                userId: user.$id,
                birthDate: new Date(values.birthDate),
                identificationDocument: formData,
            }

            // @ts-ignore
            const patient = await registerPatient(patientData)

            if (patient) router.push(`/patients/${user.$id}/new-appointment`)

        } catch (error) {
            console.error(error)
        }

        setIsLoading(false)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12 flex-1">
                <section className="space-y-4">
                    <h1 className="header">Welcome 👋</h1>
                    <p className="text-dark-700">Let us know more about yourself</p>
                </section>

                {/* PERSONAL INFORMATION */}
                <section className="space-y-4">
                    <div className="mb-9 space-y-1">
                        <h2 className="sub-header">Personal Information</h2>
                    </div>
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

                <div className="flex flex-col gap-6 xl:flex-row">
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
                        label="Phone number"
                        placeholder="(123) 456-7890"
                    />
                </div>

                <div className="flex flex-col gap-6 xl:flex-row">
                    {/* Date Picker */}
                    <CustomFormField
                        fieldType={FormFieldTypes.DATE_PICKER}
                        control={form.control}
                        name='birthDate'
                        label="Date of Birth"
                    />

                    {/* Gender */}
                    <CustomFormField
                        fieldType={FormFieldTypes.SKELETON}
                        control={form.control}
                        name='gender'
                        label="Gender"
                        renderSkeleton={(field) => (
                            <FormControl>
                                <RadioGroup
                                    className="flex h-11 gap-6 xl:justify-between"
                                    onChange={field.onChange}
                                    defaultValue={field.value}>
                                    {GenderOptions.map((option) => (
                                        <div key={option} className="radio-group">
                                            <RadioGroupItem
                                                value={option}
                                                id={option}
                                            />
                                            <Label htmlFor={option} className="cursor-pointer">
                                                {option}
                                            </Label>
                                        </div>
                                    ))}
                                </RadioGroup>
                            </FormControl>
                        )}
                    />
                </div>

                <div className="flex flex-col gap-6 xl:flex-row">
                    {/* Address */}
                    <CustomFormField
                        fieldType={FormFieldTypes.INPUT}
                        control={form.control}
                        name='address'
                        label="Address"
                        placeholder="13th Street, C.A"
                    />

                    {/* Occupation */}
                    <CustomFormField
                        fieldType={FormFieldTypes.INPUT}
                        control={form.control}
                        name='occupation'
                        label="Occupation"
                        placeholder="Web Developer"
                    />
                </div>

                <div className="flex flex-col gap-6 xl:flex-row">
                    {/* Emergency contact name */}
                    <CustomFormField
                        fieldType={FormFieldTypes.INPUT}
                        control={form.control}
                        name='emergencyContactName'
                        label="Emergency contact name"
                        placeholder="Guardian's name"
                    />

                    {/* Emergency contact number */}
                    <CustomFormField
                        fieldType={FormFieldTypes.PHONE_INPUT}
                        control={form.control}
                        name='emergencyContactNumber'
                        label="Emergency Contact Number"
                        placeholder="(123) 456-7890"
                    />
                </div>

                {/* MEDICAL INFORMATION */}
                <section className="space-y-4">
                    <div className="mb-9 space-y-1">
                        <h2 className="sub-header">Medical Information</h2>
                    </div>
                </section>

                {/* Primary Physician */}
                <CustomFormField
                    fieldType={FormFieldTypes.SELECT}
                    control={form.control}
                    name='primaryPhysician'
                    label="Primary Physician"
                    placeholder="Select a Physician"
                >
                    {Doctors.map((doctor) => (
                        <SelectItem key={doctor.name} value={doctor.name}>
                            <div className="flex gap-2 items-center cursor-pointer">
                                <Image
                                    src={doctor.image}
                                    height={32}
                                    width={32}
                                    alt={doctor.name}
                                    className="border border-dark-500 rounded-full"
                                />
                                <span>{doctor.name}</span>
                            </div>
                        </SelectItem>
                    ))}
                </CustomFormField>

                <div className="flex flex-col gap-6 xl:flex-row">
                    {/*  Insurance Provider */}
                    <CustomFormField
                        fieldType={FormFieldTypes.INPUT}
                        control={form.control}
                        name='insuranceProvider'
                        label="Insurance provider"
                        placeholder="BlueCross BlueShield"
                    />

                    {/*  Insurance Policy Number */}
                    <CustomFormField
                        fieldType={FormFieldTypes.INPUT}
                        control={form.control}
                        name='insurancePolicyNumber'
                        label="Insurance policy number"
                        placeholder="ABC123456789"
                    />
                </div>

                <div className="flex flex-col gap-6 xl:flex-row">
                    {/*  Allergies */}
                    <CustomFormField
                        fieldType={FormFieldTypes.TEXTAREA}
                        control={form.control}
                        name='allergies'
                        label="Allergies (if any)"
                        placeholder="Peanuts, Pollen, Eggs"
                    />

                    {/*  Current Medication */}
                    <CustomFormField
                        fieldType={FormFieldTypes.TEXTAREA}
                        control={form.control}
                        name='currentMedication'
                        label="Current medication (if any)"
                        placeholder="Tylenol 500mg, Advil 500mg"
                    />
                </div>

                <div className="flex flex-col gap-6 xl:flex-row">
                    {/*  Family Medical History */}
                    <CustomFormField
                        fieldType={FormFieldTypes.TEXTAREA}
                        control={form.control}
                        name='familyMedicalHistory'
                        label="Family medical history"
                        placeholder="Mother had diabetes, father had heart disease"
                    />

                    {/*  Past Medical History */}
                    <CustomFormField
                        fieldType={FormFieldTypes.TEXTAREA}
                        control={form.control}
                        name='pastMedicalHistory'
                        label="Past medical history"
                        placeholder="Appendectomy, Tonsillectomy"
                    />
                </div>

                {/* Identification and Verification */}
                <section className="space-y-4">
                    <div className="mb-9 space-y-1">
                        <h2 className="sub-header">Identification and Verification</h2>
                    </div>
                </section>

                {/* Identification Type */}
                <CustomFormField
                    fieldType={FormFieldTypes.SELECT}
                    control={form.control}
                    name='identificationType'
                    label="Identification type"
                    placeholder="Select an indentification type"
                >
                    {IdentificationTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                            <div className="cursor-pointer">
                                <span>{type}</span>
                            </div>
                        </SelectItem>
                    ))}
                </CustomFormField>

                {/*  Identification Number */}
                <CustomFormField
                    fieldType={FormFieldTypes.INPUT}
                    control={form.control}
                    name='identificationNumber'
                    label="Identification number"
                    placeholder="123456789"
                />

                {/* Identification Document */}
                <CustomFormField
                    fieldType={FormFieldTypes.SKELETON}
                    control={form.control}
                    name='identificationDocument'
                    label="Scanned copy of your identification document"
                    renderSkeleton={(field) => (
                        <FormControl>
                            <FileUploader files={field.value} onChange={field.onChange} />
                        </FormControl>
                    )}
                />

                {/* Consent and Privacy */}
                <section className="space-y-4">
                    <div className="mb-9 space-y-1">
                        <h2 className="sub-header">Consent and Privacy</h2>
                    </div>
                </section>

                {/* Treatment Consent */}
                <CustomFormField
                    fieldType={FormFieldTypes.CHECKBOX}
                    control={form.control}
                    name='treatmentConsent'
                    label="I consent to treatment"
                />

                {/* Disclosure Consent */}
                <CustomFormField
                    fieldType={FormFieldTypes.CHECKBOX}
                    control={form.control}
                    name='disclosureConsent'
                    label="I consent to disclosure of information"
                />

                {/* Privacy Consent */}
                <CustomFormField
                    fieldType={FormFieldTypes.CHECKBOX}
                    control={form.control}
                    name='privacyConsent'
                    label="I consent to privacy policy"
                />

                <SubmitButton isLoading={isLoading}>Submit and continue</SubmitButton>
            </form>
        </Form>
    )
}

export default RegisterForm
