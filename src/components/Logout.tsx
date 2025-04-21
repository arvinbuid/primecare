'use client'

import Link from "next/link"
import { Button } from "./ui/button"

const LogoutButton = () => {
    const logout = () => {
        localStorage.removeItem('passkey')

    }

    return (
        <Button asChild>
            <Link
                href='/'
                className="text-14-regular"
                onClick={logout}
            >
                Logout
            </Link>
        </Button>
    )
}

export default LogoutButton