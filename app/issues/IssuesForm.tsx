'use client'

import React, { useState } from 'react';
import { Button, TextField } from "@radix-ui/themes";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { TaskSchema } from "@/app/validationSchemas";
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { ErrorMessage } from "@/app/components/ErrorMessage";
import { Loader } from "@/app/components/Loader";
import { Task } from "@prisma/client";
import SimpleMDE from 'react-simplemde-editor';

type IssueForm = z.infer<typeof TaskSchema>;

interface Props {
    task?: Task,
    setIsEditDialogOpen?: (value: boolean) => void
}

const NewIssuePage = ({ task, setIsEditDialogOpen }: Props) => {
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();

    const {
        register,
        handleSubmit,
        control,
        formState: { errors }
    } = useForm<IssueForm>({
        resolver: zodResolver(TaskSchema),
        defaultValues: {
            title: task?.title || '',
            description: task?.description || ''
        }
    });

    const onSubmit = handleSubmit(async (data) => {
        try {
            setLoading(true);
            if (task && setIsEditDialogOpen) {
                await axios.put(`/api/issues`, {
                    title: data.title,
                    description: data.description,
                    id: task.id
                });
                setIsEditDialogOpen(false);
                router.refresh();
            } else {
                await axios.post('/api/issues', data);
                router.push('/issues');
            }
        } catch (error) {
            setError('An error occurred while submitting the form');
        } finally {
            setLoading(false);
        }
    });

    return (
        <div className="flex justify-center items-start w-full">
            <form
                onSubmit={onSubmit}
                className="w-full max-w-2xl space-y-5 bg-bgdark p-4 sm:p-6 rounded-xl shadow-md border border-[#2a2a2e]"
            >
                <h2 className="text-xl sm:text-2xl font-semibold text-white mb-1 sm:mb-2">
                    {task ? "Edit Issue" : "Create New Issue"}
                </h2>

                <TextField.Root
                    placeholder="Enter issue title"
                    className="w-full text-sm sm:text-base"
                    {...register("title")}
                />

                <div className="text-sm sm:text-base">
                    <Controller
                        name="description"
                        control={control}
                        render={({ field }) => (
                            <SimpleMDE
                                placeholder="Describe your issue in detail..."
                                className="w-full rounded-md border border-[#3a3a3f] bg-[#111113] text-sm"
                                {...field}
                            />
                        )}
                    />
                </div>

                <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-ruby hover:bg-[#c63a58] transition-colors duration-300 text-sm sm:text-base"
                >
                    {task ? "Save Changes" : "Submit"}
                    {loading && <Loader />}
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

                {error && (
                    <ErrorMessage className="text-red-500 text-sm">
                        {error}
                    </ErrorMessage>
                )}
            </form>
        </div>
    );
};

export default NewIssuePage;
