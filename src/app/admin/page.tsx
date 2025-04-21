import StatCard from "@/components/StatCard"
import Image from "next/image"
import Link from "next/link"
import DataTable from "@/components/table/DataTable";
import columns from "@/components/table/columns";

import { getRecentAppointmentList } from "../../../lib/actions/appointment.actions";
import LogoutButton from "@/components/Logout";

const Admin = async () => {
    const appointments = await getRecentAppointmentList();

    return (
        <div className='mx-auto flex flex-col max-w-7xl space-y-14'>
            <header className="admin-header">
                <Link href='/' className="cursor-pointer">
                    <Image
                        src='/assets/icons/logo-full.svg'
                        alt='PrimeCare Logo'
                        width={162}
                        height={32}
                        className="h-8 w-fit"
                    />
                </Link>

                <LogoutButton />
            </header>

            <main className="admin-main">
                <section className="w-full space-y-4">
                    <h1 className="header">Welcome 👋</h1>
                    <p className="text-dark-700">Start your day by managing appointments</p>
                </section>

                <section className="admin-stat">
                    {/* Scheduled Appointments */}
                    <StatCard
                        type="appointments"
                        count={appointments.totalCount}
                        label="Scheduled Appointments"
                        icon="/assets/icons/appointments.svg"
                    />
                    {/* Pending Appointments */}
                    <StatCard
                        type="pending"
                        count={appointments.pendingCount}
                        label="Pending Appointments"
                        icon="/assets/icons/pending.svg"
                    />
                    {/* Cancelled Appointments */}
                    <StatCard
                        type="cancelled"
                        count={appointments.cancelledCount}
                        label="Cancelled Appointments"
                        icon="/assets/icons/cancelled.svg"
                    />
                </section>

                <DataTable columns={columns} data={appointments.documents} />
            </main>
        </div>
    )
}

export default Admin
