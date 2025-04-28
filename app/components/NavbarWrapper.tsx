'use client'

import { usePathname } from 'next/navigation'
import { NavBar} from '../NavBar'

export default function NavbarWrapper() {
    const pathname = usePathname()
    const hideNavbar = ['/auth/signin']

    if (hideNavbar.includes(pathname)) return null

    return <NavBar />
}