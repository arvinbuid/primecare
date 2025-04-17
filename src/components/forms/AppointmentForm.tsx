"use client"

import { z } from "zod"
import { Form } from "../ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import CustomFormField from "../CustomFormField"
import SubmitButton from "../SubmitButton"
import { useState } from "react"
import { getAppointmentSchema } from "../../../lib/validation"
import { useRouter } from "next/navigation"
import { Doctors } from "../../../constants"
import { SelectItem } from "../ui/select"
import Image from "next/image"
import { createAppointment } from "../../../lib/actions/appointment.actions"

export enum FormFieldTypes {
    INPUT = 'input',
    TEXTAREA = 'textarea',
    PHONE_INPUT = 'phoneInput',
    CHECKBOX = 'checkbox',
    DATE_PICKER = 'datePicker',
    SELECT = 'select',
    SKELETON = 'skeleton'
}

interface AppointmentFormProps {
    type: "create" | "cancel" | "schedule",
    userId: string,
    patientId: string,
}

const AppointmentForm = ({ type, userId, patientId }: AppointmentFormProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter()

    const AppointmentFormValidation = getAppointmentSchema(type)

    const form = useForm<z.infer<typeof AppointmentFormValidation>>({
        resolver: zodResolver(AppointmentFormValidation),
        defaultValues: {
            primaryPhysician: "",
            schedule: new Date(),
            reason: "",
            note: "",
            cancellationReason: "",
        },
    })

    async function onSubmit(values: z.infer<typeof AppointmentFormValidation>) {
        setIsLoading(true);

        let status;

        switch (type) {
            case 'schedule':
                status = 'scheduled';
                break;
            case 'cancel':
                status = 'cancelled';
                break;
            default:
                status = 'pending';
                break;
        }

        try {
            if (type === 'create' && patientId) {
                const appointmentData = {
                    userId,
                    patient: patientId,
                    primaryPhysician: values.primaryPhysician,
                    reason: values.reason!,
                    schedule: values.schedule,
                    status: status as Status,
                    note: values.note,
                }

                // Create new appointment
                const newAppointment = await createAppointment(appointmentData)

                if (newAppointment) {
                    form.reset();
                    router.push(`/patients/${userId}/new-appointment/success?appointmentId=${newAppointment.$id}`)

                }
            }
        } catch (error) {
            console.error(error)
        }
        setIsLoading(false);
    }

    let buttonLabel;

    switch (type) {
        case 'cancel':
            buttonLabel = 'Cancel Appointment';
            break;
        case 'create':
            buttonLabel = 'Create Appointment';
            break;
        case 'schedule':
            buttonLabel = 'Schedule Appointment';
            break;
        default:
            break;
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
                <section className="mb-12 space-y-4">
                    <h1 className="header">Hi there 👋</h1>
                    <p className="text-gray-500">Schedule your new appointment</p>
                </section>

                {type !== 'cancel' && (
                    <>
                        {/* Doctor */}
                        <CustomFormField
                            fieldType={FormFieldTypes.SELECT}
                            control={form.control}
                            name='primaryPhysician'
                            label="Doctor"
                            placeholder="Select your doctor"
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

                        {/* Schedule */}
                        <CustomFormField
                            fieldType={FormFieldTypes.DATE_PICKER}
                            control={form.control}
                            name="schedule"
                            label="Expected appointment date"
                            showTimeSelect
                            dateFormat="MM/dd/yyyy - h:mm aa"
                        />

                        <div className="flex flex-col gap-6 xl:flex-row">
                            {/* Reason */}
                            <CustomFormField
                                fieldType={FormFieldTypes.TEXTAREA}
                                control={form.control}
                                name="reason"
                                label="Reason for appointment"
                                placeholder="Enter reason for appointment"
                            />

                            {/* Notes */}
                            <CustomFormField
                                fieldType={FormFieldTypes.TEXTAREA}
                                control={form.control}
                                name="notes"
                                label="Notes"
                                placeholder="Enter notes"
                            />
                        </div>
                    </>
                )}

                {type === 'cancel' && (
                    <CustomFormField
                        fieldType={FormFieldTypes.TEXTAREA}
                        control={form.control}
                        name="cancellationReason"
                        label="Reason for cancellation"
                        placeholder="Enter reason for cancellation"
                    />
                )}


                <SubmitButton isLoading={isLoading} className={`${type === 'cancel' ? 'shad-danger-btn' : 'shad-primary-btn'} w-full`}>
                    {buttonLabel}
                </SubmitButton>
            </form>
        </Form>
    )
}

export default AppointmentForm
