'use client'

import Image from "next/image";
import { Button } from "./ui/button"

interface SubmitButtonProps {
    isLoading: boolean;
    className?: string
    children: React.ReactNode
}
const SubmitButton = ({ isLoading, className, children }: SubmitButtonProps) => {
    return (
        <Button
            disabled={isLoading}
            type="submit"
            className={className ?? "shad-primary-btn w-full"}
        >{isLoading ? (
            <div className="flex items-center gap-4">
                <Image
                    src='/assets/icons/loader.svg'
                    alt="spinner"
                    width={24}
                    height={24}
                    className="animate-spin"
                />
            </div>
        ) : children}
        </Button>
    )
}

export default SubmitButton
