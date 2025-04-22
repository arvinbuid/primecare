import { LoaderCircle } from "lucide-react";

export default function Loading() {
    return (
        <div className="flex flex-col h-screen max-h-screen items-center justify-center">
            <LoaderCircle className="size-16 md:size-24 animate-spin text-green-500" />
        </div>
    )
}