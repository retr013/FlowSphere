import {prisma} from "@/prisma/client";
import {notFound} from "next/navigation";
import {Box, Flex} from "@radix-ui/themes";
import {IssueDetails} from "@/app/issues/[id]/IssueDetails";
import {UserSelector} from "@/app/issues/[id]/UserSelector";
import {Loader} from "@/app/components/Loader";
import dynamic from "next/dynamic";
import React, {Suspense} from "react";
import {StatusSelectorWrapper} from "@/app/issues/[id]/StatusSelectorWrapper";

interface Props {
    params: { id: string };
}

const IssueDetailPage = async ({params}: Props) => {

    const resolvedParams = await params;
    const id = parseInt(resolvedParams.id);

    const issue = await prisma.task.findUnique({
        where: {id},
    });

    if (!issue) {
        notFound();
    }

    return (
        <Box className="max-w-3xl mx-auto p-6 bg-bgdark text-white shadow-lg rounded-lg mt-16">
            <IssueDetails issue={issue}/>
            <Flex gap={'3'} className="mt-2">
                <UserSelector issue={issue}/>
                <StatusSelectorWrapper issue={issue} />
            </Flex>
        </Box>
    );
};

export default IssueDetailPage;
