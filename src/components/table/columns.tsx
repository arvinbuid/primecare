"use client"

import StatusBadge from "../StatusBadge"
import Image from "next/image"

import { ColumnDef } from "@tanstack/react-table"
import { formatDateTime } from "../../../lib/utils"
import { Doctors } from "../../../constants"

export type Patient = {
    id: string
    patient: {
        name: string
    }
    status: Status
    schedule: string
    primaryPhysician: string
}

const columns: ColumnDef<Patient>[] = [
    /* ID */
    {
        accessorKey: "ID",
        cell: ({ row }) => <p className="text-14-medium">{row.index + 1}</p>
    },
    /* Patient */
    {
        accessorKey: "patient",
        header: "Patient",
        cell: ({ row }) => <p className="text-14-medium">{row.original.patient.name}</p>

    },
    /* Status */
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            return (
                <div className="min-w-[115px]">
                    <StatusBadge status={row.original.status} />
                </div>
            )
        }
    },
    /* Schedule */
    {
        accessorKey: "schedule",
        header: "Schedule",
        cell: ({ row }) => (
            <p className="text-14-regular min-w-[100px]">
                {formatDateTime(row.original.schedule).dateTime}
            </p>
        )
    },
    /* Primary Physician */
    {
        accessorKey: "primaryPhysician",
        header: "Doctor",
        cell: ({ row }) => {
            const doctor = Doctors.find(doctor => doctor.name === row.original.primaryPhysician);

            if (!doctor) return null;

            return (
                <div className="flex items-center gap-3">
                    <Image
                        src={doctor?.image}
                        alt={doctor?.name}
                        width={100}
                        height={100}
                        className="size-8"
                    />
                    <p className="whitespace-nowrap">{doctor?.name}</p>
                </div>
            )
        }
    },
    /* Actions */
    {
        id: "actions",
        header: () => <p className="pl-4">Actions</p>,
        cell: ({ row }) => {
            return (
                <div className="flex gap-1">
                    {/* AppointmentModal here... */}
                </div>
            )
        },
    },
]

export default columns
