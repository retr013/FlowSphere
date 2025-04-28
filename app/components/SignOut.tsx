'use server'

import { signOut } from "@/auth"

export default async function signOutFunction() {
    return (
        await signOut()
    )
}