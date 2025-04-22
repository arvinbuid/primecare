import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

const Unauthorized = () => {
    return (
        <div className="flex flex-col h-screen max-h-screen items-center justify-center">
            <div className="mx-auto px-4 text-center">
                <h1 className="text-xl md:text-3xl">You are unauthorized to access this page.</h1>
                <p className="text-sm md:text-xl text-green-500 mt-3 md:mt-5">
                    <Link href='/' className="flex justify-center items-center gap-2">
                        <ArrowLeft className="size-3 md:size-5" />
                        <span>Go back</span>
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default Unauthorized