import Image from "next/image"
import Link from "next/link"
import { getAppointment } from "../../../../../../lib/actions/appointment.actions"
import { Doctors } from "../../../../../../constants"
import { formatDateTime } from "../../../../../../lib/utils"
import { Button } from "@/components/ui/button"

const Success = async (props: {
    params: Promise<{ userId: string }>
    searchParams: Promise<{ appointmentId: string }>
}) => {

    const { userId } = await props.params;
    const { appointmentId } = await props.searchParams;

    const appointment = await getAppointment(appointmentId);
    const doctor = Doctors.find(doctor => doctor.name === appointment.primaryPhysician);

    return (
        <div className="flex h-screen max-h-screen px-[5%]">
            <div className="success-img">
                <Link href='/'>
                    <Image
                        src="/assets/icons/logo-full.svg"
                        height={1000}
                        width={1000}
                        alt='PrimeCare Logo'
                        className="h-10 w-fit"
                    />
                </Link>

                <section className="flex flex-col items-center">
                    <Image
                        src='/assets/gifs/success.gif'
                        alt='Success GIF'
                        width={300}
                        height={280}
                    />
                    <h2 className="header mb-6 max-w-[600px] text-center">
                        Your <span className="text-green-500">appointment request</span> has been successfully submitted!
                    </h2>
                    <p>We will be in touch shortly to confirm.</p>
                </section>

                <section className="request-details">
                    <p className="text-gray-300">Requested appointment details:</p>
                    <div className="flex items-center gap-3">
                        {/* Doctor Image */}
                        <Image
                            src={doctor?.image!}
                            alt={doctor?.name!}
                            width={100}
                            height={100}
                            className="size-6"
                        />
                        <p className="whitespace-nowrap">{doctor?.name}</p>
                    </div>
                    <div className="flex gap-2">
                        <Image
                            src="/assets/icons/calendar.svg"
                            alt="Calendar Icon"
                            width={20}
                            height={20}
                        />
                        <p>{formatDateTime(appointment.schedule).dateTime}</p>
                    </div>
                </section>

                <Button variant='outline' className="shad-primary-btn" asChild>
                    <Link href={`/patients/${userId}/new-appointment`}>
                        New appointment
                    </Link>
                </Button>
            </div>
        </div>
    )
}

export default Success
