"use client"

import type React from "react"

import {useState} from "react"
import {Button, Text, Dialog } from "@radix-ui/themes"
import {IssueStatusBadge} from "@/app/components/IssueStatusBadge"
import type {Task} from "@prisma/client"
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

interface Props {
    task: Task
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
                    className="dark:bg-bgdark p-6 rounded-lg border border-gray-700 hover:shadow-md group-hover:scale-105 transition duration-300 overflow-visible h-full">
                    <Link href={`/issues/${task.id}`} className="block">
                        <p className="text-xl font-semibold text-ruby">{task.title}</p>
                        <Text
                            className="text-gray-300 mt-2 max-w-full resize-none overflow-hidden h-24 bg-transparent">
                            {task.description}
                        </Text>
                        <div className="flex justify-between items-center mt-4">
                        <span className="text-sm text-gray-400">
                          Task ID: <span className="font-semibold">{task.id}</span>
                        </span>
                        </div>
                        <div className="flex justify-between items-center mt-4">
                        <span className="text-sm text-gray-400">
                          Created: <span className="font-semibold">{formattedDate}</span>
                        </span>
                        </div>
                        <IssueStatusBadge status={task.status}/>
                    </Link>
                </div>
                {session?.status === 'authenticated' &&
                    <div className="absolute left-0 flex justify-center -translate-y-8 gap-2 bg-none p-4 transition-all duration-300 opacity-0 group-hover:opacity-100 group-hover:translate-y-0.5 z-10 w-full">
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

