"use client"

import type React from "react"

import {useState} from "react"
import {Button, Text, Dialog, Avatar} from "@radix-ui/themes"
import {IssueStatusBadge} from "@/app/components/IssueStatusBadge"
import {Prisma, Task} from "@prisma/client"
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
    handleDeleteTask: (id: number) => Promise<void>
    handleUpdateTask?: (id: number, updatedTask: Partial<Task>) => Promise<void>
}

export const IssueCard = ({task, handleDeleteTask, handleUpdateTask}: Props) => {

    const session = useSession()

    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)

    const formattedDate = FormatDate(task.createdAt)

    const handleDelete = async (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        await handleDeleteTask(task.id)
    }

    const handleEditClick = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setIsEditDialogOpen(true)
    }

    return (
        <>
            <div className='relative group'>
                <div
                    className="dark:bg-bgdark px-6 py-5 rounded-lg border border-gray-700 hover:shadow-md group-hover:scale-105 transition duration-300 overflow-visible h-full">
                    <Link href={`/issues/${task.id}`} className="flex flex-col justify-between h-full">
                        <div className='pb-5'>
                            <p className="text-2xl font-semibold text-ruby mb-4">{task.title}</p>
                            <Text
                                className="text-gray-300 mt-4 max-w-full resize-none overflow-hidden bg-transparent">
                                {task.description}
                            </Text>
                        </div>
                        <div className=''>
                            <div className="flex justify-between items-center mt-5">
                            <span className="text-sm text-gray-400">
                              Created: <span className="font-semibold">{formattedDate}</span>
                            </span>
                            </div>
                            <div className="flex-col justify-between items-center mt-2 mb-auto">
                                {task.assignedToUser?.name &&
                                    <span className="text-sm text-gray-400">
                                    Assigned to:
                                        <span className="font-semibold ml-1">{task.assignedToUser?.name}</span>
                                </span>
                                }
                                <IssueStatusBadge status={task.status}/>
                            </div>
                        </div>
                    </Link>
                </div>
                {session?.status === 'authenticated' &&
                    <div
                        className="absolute left-0 flex justify-center -translate-y-8 gap-2 bg-none p-4 transition-all duration-300 opacity-0 group-hover:opacity-100 group-hover:translate-y-0.5 z-10 w-full">
                        <Button size="3" onClick={handleEditClick}>
                            Edit
                        </Button>
                        <TaskDeleteButton handleDeleteTask={handleDeleteTask} taskId={task.id}/>
                    </div>
                }
            </div>
            <Dialog.Root open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                <Dialog.Content className="dark:bg-gray-800 dark:border-gray-700">
                    <Dialog.Title>Edit Task</Dialog.Title>
                    <Dialog.Description size="2" mb="4">
                        Make changes to the task details below.
                    </Dialog.Description>
                    <IssuesForm task={task} setIsEditDialogOpen={setIsEditDialogOpen}/>
                </Dialog.Content>
            </Dialog.Root>
        </>
    )
}

