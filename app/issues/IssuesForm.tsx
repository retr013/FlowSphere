'use client'

import React, {useState} from 'react';
import {Button, TextField} from "@radix-ui/themes";
import "easymde/dist/easymde.min.css";
import {useForm, Controller} from "react-hook-form";
import axios from "axios";
import {useRouter} from "next/navigation";
import {TaskSchema} from "@/app/validationSchemas";
import {z} from "zod";
import {zodResolver} from '@hookform/resolvers/zod';
import {ErrorMessage} from "@/app/components/ErrorMessage";
import {Loader} from "@/app/components/Loader";
import {Task} from "@prisma/client";
import SimpleMDE from 'react-simplemde-editor';

type IssueForm = z.infer<typeof TaskSchema>

interface Props {
    task?: Task,
    setIsEditDialogOpen?: (value: boolean) => void
}

const NewIssuePage = ({task, setIsEditDialogOpen}: Props) => {

    const [error, setError] = useState<string | null>(null);

    const [loading, setLoading] = useState<boolean>(false);

    const router = useRouter();

    const {
        register,
        handleSubmit,
        control,
        formState: {errors}
    } = useForm<IssueForm>({
        resolver: zodResolver(TaskSchema),
        defaultValues: {description: task?.description, title: task?.title}
    });

    const onSubmit = handleSubmit(async (data) => {
        try {
            setLoading(true)
            if (task && setIsEditDialogOpen) {
                await axios.put(`/api/issues`, {
                    title: data.title,
                    description: data.description,
                    id: task.id
                })
                setIsEditDialogOpen(false)
                router.refresh()
            } else {
                await axios.post('/api/issues', data)
                router.push('/issues')
            }
        } catch (error) {
            setError('An error occurred while submitting the form')
        } finally {
            setLoading(false)
        }
    });

    return (
        <div className="flex justify-center items-start px-4">
            <form
                onSubmit={onSubmit}
                className="w-full max-w-2xl space-y-6 bg-bgdark p-8 rounded-xl shadow-lg border border-[#2a2a2e]"
            >
                <h2 className="text-2xl font-semibold text-white mb-2">Create New Issue</h2>

                <TextField.Root
                    placeholder="Enter issue title"
                    className="w-full"
                    {...register("title")}
                />

                <Controller
                    name="description"
                    control={control}
                    render={({ field }) => (
                        <SimpleMDE
                            placeholder="Describe your issue in detail..."
                            className="w-full rounded-md border border-[#3a3a3f] bg-[#111113]"
                            {...field}
                        />
                    )}
                />

                <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-ruby hover:bg-[#c63a58] transition-colors duration-300"
                >
                    Submit
                    {loading && <Loader/>}
                </Button>

                {errors.title?.message && (
                    <ErrorMessage className="text-red-400 text-sm">
                        {errors.title.message}
                    </ErrorMessage>
                )}

                {errors.description?.message && (
                    <ErrorMessage className="text-red-400 text-sm">
                        {errors.description.message}
                    </ErrorMessage>
                )}
            </form>
        </div>

    );
};

export default NewIssuePage;