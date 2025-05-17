"use client"

import type React from "react"

import {useState} from "react"
import {Button, Text, Dialog} from "@radix-ui/themes"
import {IssueStatusBadge} from "@/app/components/IssueStatusBadge"
import {Prisma} from "@prisma/client"
import Link from "next/link"
import FormatDate from "../utils/FormatDate"
import dynamic from "next/dynamic";
import IssuesFormLoader from "@/app/components/IssuesFormLoader";
import TaskDeleteButton from "@/app/issues/TaskDeleteButton";
import {useSession} from "next-auth/react";

const IssuesForm = dynamic(() => import('@/app/issues/IssuesForm'), {
    ssr: false,
    loading: () => <IssuesFormLoader/>,
})

type TaskWithUser = Prisma.TaskGetPayload<{
    include: { assignedToUser: true };
}>;

interface Props {
    task: TaskWithUser
    handleDeleteTaskAction: (id: number) => Promise<void>
}

export const IssueCard = ({task, handleDeleteTaskAction}: Props) => {

    const session = useSession()

    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)

    const formattedDate = FormatDate(task.createdAt)

    const handleEditClick = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setIsEditDialogOpen(true)
    }

    return (
        <>
            <div className="relative group h-full">
                <div
                    className="dark:bg-bgdark px-4 sm:px-6 py-4 sm:py-5 rounded-lg border border-gray-700 hover:shadow-md group-hover:scale-[1.02] transition duration-300 overflow-visible flex flex-col h-full">
                    <Link href={`/issues/${task.id}`} className="flex-grow flex flex-col justify-between">
                        <div className="pb-4">
                            <p className="text-lg sm:text-2xl font-semibold text-ruby mb-2 sm:mb-4">{task.title}</p>
                            <Text
                                className="text-sm sm:text-base text-gray-300 mt-2 sm:mt-4 max-w-full resize-none overflow-hidden bg-transparent">
                                {task.description}
                            </Text>
                        </div>
                        <div className="mt-auto">
                            <div className="flex justify-between items-center mt-4">
                                <span className="text-xs sm:text-sm text-gray-400">
                                  Created: <span className="font-semibold">{formattedDate}</span>
                                </span>
                            </div>
                            <div
                                className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-2 mt-2">
                                {task.assignedToUser?.name && (
                                    <span className="text-xs sm:text-sm text-gray-400">Assigned to:
                                        <span className="font-semibold ml-1">{task.assignedToUser.name}</span>
                                    </span>
                                )}
                                <IssueStatusBadge status={task.status}/>
                            </div>
                        </div>
                    </Link>
                    <div className="mt-4 flex gap-2 lg:hidden">
                        <Button size={{initial: "2", md: "3"}} onClick={handleEditClick} className="w-full">
                            Edit
                        </Button>
                        <TaskDeleteButton handleDeleteTask={handleDeleteTaskAction} taskId={task.id}/>
                    </div>
                </div>
                {session?.status === "authenticated" && (
                    <div
                        className="absolute left-0 hidden lg:flex justify-center -translate-y-8 gap-2 bg-none p-4 transition-all duration-300 opacity-0 group-hover:opacity-100 group-hover:translate-y-0.5 z-10 w-full">
                        <Button size="3" onClick={handleEditClick}>
                            Edit
                        </Button>
                        <TaskDeleteButton handleDeleteTask={handleDeleteTaskAction} taskId={task.id}/>
                    </div>
                )}
            </div>

            <Dialog.Root open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                <Dialog.Content className="dark:bg-gray-800 dark:border-gray-700">
                    <Dialog.Title hidden={true}>Edit Task</Dialog.Title>
                    <Dialog.Description size="2" mb="4" hidden={true}>
                        Make changes to the task details below.
                    </Dialog.Description>
                    <IssuesForm task={task} setIsEditDialogOpen={setIsEditDialogOpen}/>
                </Dialog.Content>
            </Dialog.Root>
        </>

    )
}

