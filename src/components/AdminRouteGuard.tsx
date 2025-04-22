'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { decryptKey } from '../../lib/utils';

interface AdminRouteGuardProps {
    children: React.ReactNode
}

const AdminRouteGuard = ({ children }: AdminRouteGuardProps) => {
    const router = useRouter();
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
        const storedAccessKey = localStorage.getItem('passkey');
        const passkey = storedAccessKey && decryptKey(storedAccessKey);

        if (!storedAccessKey || passkey !== process.env.NEXT_PUBLIC_ADMIN_PASSKEY) {
            router.push('/unauthorized');
        } else {
            setIsAuthorized(true)
        }
    }, [router]);

    if (!isAuthorized) return null;

    return <>{children}</>;
}

export default AdminRouteGuard