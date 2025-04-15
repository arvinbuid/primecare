'use client'

import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { FormFieldTypes } from "./forms/PatientForm"
import Image from "next/image"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { E164Number } from 'libphonenumber-js/core'

interface CustomProps {
    control: any
    fieldType: FormFieldTypes
    name: string,
    label?: string,
    placeholder?: string,
    iconSrc?: string,
    iconAlt?: string,
    disabled?: boolean,
    dateFormat?: string,
    showTimeSelect?: boolean,
    children?: React.ReactNode,
    renderSkeleton?: (field: any) => React.ReactNode
}

const RenderField = ({ field, props }: { field: any, props: CustomProps }) => {
    const { fieldType, iconSrc, iconAlt, placeholder, showTimeSelect, dateFormat, renderSkeleton } = props

    switch (fieldType) {
        case FormFieldTypes.INPUT:
            return (
                <div className="flex rounded-md border border-dark-500 bg-dark-400">
                    {iconSrc && (
                        <Image src={iconSrc} alt={iconAlt || 'icon'} width={24} height={24} className="ml-2" />
                    )}
                    <FormControl>
                        <Input
                            placeholder={placeholder}
                            {...field}
                            className='shad-input border-0'
                        />
                    </FormControl>
                </div>
            )
        case FormFieldTypes.PHONE_INPUT:
            return (
                <FormControl>
                    <PhoneInput
                        defaultCountry="PH"
                        international
                        placeholder={placeholder}
                        withCountryCallingCode
                        value={field.value as E164Number | undefined}
                        onChange={field.onChange}
                        className="input-phone"
                    />
                </FormControl>
            )
        case FormFieldTypes.DATE_PICKER:
            return (
                <div className="flex rounded-md border border-dark-500 bg-dark-400">
                    <Image
                        src="/assets/icons/calendar.svg"
                        height={24}
                        width={24}
                        alt="user"
                        className="ml-2"
                    />
                    <FormControl>
                        <DatePicker
                            selected={field.value}
                            onChange={(date) => field.onChange(date)}
                            showTimeSelect={showTimeSelect ?? false}
                            timeInputLabel="Time:"
                            dateFormat={dateFormat ?? "MM/dd/yyyy"}
                            wrapperClassName="date-picker"
                        />
                    </FormControl>
                </div>
            )
        case FormFieldTypes.SKELETON:
            return renderSkeleton ? renderSkeleton(field) : null
        default:
            break;
    }
}

const CustomFormField = (props: CustomProps) => {
    const { control, fieldType, name, label } = props;

    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className="flex-1 items-center">
                    {props.fieldType !== FormFieldTypes.CHECKBOX && label && (
                        <FormLabel className="shad-input-label">{label}</FormLabel>
                    )}

                    <RenderField field={field} props={props} />

                    <FormMessage className="shad-error" />
                </FormItem>
            )}
        />
    )
}

export default CustomFormField
