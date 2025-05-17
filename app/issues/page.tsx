import {Box, Button, Heading} from "@radix-ui/themes";
import Link from "next/link";
import {IssueCard} from "@/app/issues/IssuesCard";
import {prisma} from "@/prisma/client";
import {revalidatePath} from "next/cache";
import {IssuesFilter} from "@/app/components/IssuesFilter";
import {Status} from "@prisma/client";
import {Metadata} from "next";
import {SearchParams} from "next/dist/server/request/search-params";

export const metadata: Metadata = {
    title: "Issues | FlowSphere",
    description: "View and manage all your tasks and issues in one place",
    openGraph: {
        title: "Issues | FlowSphere",
        description: "View and manage all your tasks and issues in one place",
        type: "website",
    }
}

async function handleDeleteTask(taskId: number) {
    "use server";
    try {
        await prisma.task.delete({where: {id: taskId}});
        revalidatePath("/issues"); // Refresh the page to update UI
    } catch (error) {
        console.error("Failed to delete task:", error);
    }
}

const IssuesPage = async ({ searchParams }: { searchParams: Promise<any> }) => {

    const params = await (searchParams as Promise<SearchParams>)

    const statuses = Object.values(Status);

    const status = statuses.includes(params.status as Status) ? (params.status as Status) : undefined

    const tasks = await prisma.task.findMany(
        {
            where: {status},
            include: {assignedToUser: true}
        });

    return (
        <>
            <Box className="p-6">
                <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center mb-12 gap-4">
                    <Heading as="h1" size="7" className="mb-4 sm:mb-0 sm:text-left text-center text-white text-xl sm:text-3xl w-full md:w-auto">
                        User Issues
                    </Heading>
                    <IssuesFilter defaultValue={status}/>
                    <Button size="2" className="w-full md:w-auto">
                        <Link href="/issues/new" className="block text-center">
                            Create new issue
                        </Link>
                    </Button>
                </div>

                <div className="container mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {tasks.map((task) => (
                            <IssueCard
                                key={task.id}
                                task={task}
                                handleDeleteTaskAction={handleDeleteTask}
                            />
                        ))}
                    </div>
                </div>
            </Box>
        </>
    );
};

export default IssuesPage;