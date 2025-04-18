import PatientForm from "@/components/forms/PatientForm";
import PasskeyModal from "@/components/PasskeyModal";
import Image from "next/image";
import Link from "next/link";

export default async function Home(props: {
  searchParams: Promise<{ admin: string }>;
}) {
  const { admin } = await props.searchParams;

  const isAdmin = admin === "true";

  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container">
        {isAdmin && <PasskeyModal />}
        <div className="sub-container max-w-[496px]">
          <Image
            src="/assets/icons/logo-full.svg"
            height={1000}
            width={1000}
            alt="PrimeCare Logo"
            className="mb-12 h-10 w-fit"
          />

          <PatientForm />

          <div className="text-14-regular mt-20 flex justify-between">
            <p className="justify-items-end text-dark-600 xl:text-left">
              © 2025 PrimeCare
            </p>
            <Link href="/?admin=true" className="text-green-500">
              Admin
            </Link>
          </div>
        </div>
      </section>

      <Image
        src="/assets/images/doctors.png"
        height={1000}
        width={1000}
        alt="Doctors"
        className="side-img max-w-[50%]"
      />
    </div>
  );
}
