"use client"

import { useState, useEffect } from "react"
import StatusSelector from "./StatusSelector"
import type { Task } from "@prisma/client"
import {Loader} from "@/app/components/Loader";

interface StatusSelectorWrapperProps {
    issue: Task
}

export function StatusSelectorWrapper({ issue }: StatusSelectorWrapperProps) {

    const [isClient, setIsClient] = useState(false)

    // This effect will run only on the client after hydration
    useEffect(() => {
        setIsClient(true)
    }, [])

    if (!isClient) {
        return <Loader />
    }

    return <StatusSelector issue={issue} />
}

