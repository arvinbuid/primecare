import RegisterForm from "@/components/forms/RegisterForm"
import Image from "next/image"
import Link from "next/link"

import { getUser } from "../../../../../lib/actions/patient.actions"

const Register = async (props: {
    params: Promise<{ userId: string }>
}) => {
    const { userId } = await props.params;
    const user = await getUser(userId);

    return (
        <div className="flex h-screen max-h-screen">
            <section className="remove-scrollbar container">
                <div className="sub-container max-w-[860px] flex-1 flex-col py-10">
                    <Image
                        src="/assets/icons/logo-full.svg"
                        height={1000}
                        width={1000}
                        alt="PrimeCare Logo"
                        className="mb-12 h-10 w-fit"
                    />

                    <RegisterForm user={user} />

                    <p className="copyright py-12">
                        © 2025 PrimeCare
                    </p>
                </div>
            </section>

            <Image
                src="/assets/images/register-img.png"
                height={1000}
                width={1000}
                alt="Register Image"
                className="side-img max-w-[390px]"
            />
        </div>
    )
}

export default Register
