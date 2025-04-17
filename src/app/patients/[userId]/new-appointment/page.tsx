import Image from "next/image"

import { getUser } from "../../../../../lib/actions/patient.actions"

const NewAppointment = async (props: {
    params: Promise<{ userId: string }>
}) => {
    const { userId } = await props.params;
    const user = await getUser(userId);

    return (
        <div className="flex h-screen max-h-screen">
            <section className="remove-scrollbar container my-10">
                <div className="sub-container max-w-[860px] flex-1 justify-between">
                    <Image
                        src="/assets/icons/logo-full.svg"
                        height={1000}
                        width={1000}
                        alt="PrimeCare Logo"
                        className="mb-12 h-10 w-fit"
                    />

                    {/* Appointment Form */}

                    <p className="copyright py-12">
                        © 2025 PrimeCare
                    </p>
                </div>
            </section>

            <Image
                src="/assets/images/appointment-img.png"
                height={1000}
                width={1000}
                alt="Appointment Image"
                className="side-img max-w-[390px]"
            />
        </div>
    )
}

export default NewAppointment
