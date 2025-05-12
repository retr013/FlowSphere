import {Box, Button, Heading} from "@radix-ui/themes";
import Link from "next/link";
import {IssueCard} from "@/app/issues/IssuesCard";
import {prisma} from "@/prisma/client";
import {revalidatePath} from "next/cache";
import {IssuesFilter} from "@/app/components/IssuesFilter";
import {Status} from "@prisma/client";

async function handleDeleteTask(taskId: number) {
    "use server";
    try {
        await prisma.task.delete({where: {id: taskId}});
        revalidatePath("/issues"); // Refresh the page to update UI
    } catch (error) {
        console.error("Failed to delete task:", error);
    }
}

const IssuesPage = async ({searchParams}: { searchParams: { status: Status } }) => {

    const params = await searchParams;

    const statuses = Object.values(Status);

    const status = statuses.includes(params.status) ? params.status : undefined;

    const tasks = await prisma.task.findMany(
        {
            where: {status},
            include: {assignedToUser: true}
        });

    return (
        <>
            <Box className="p-6">
                <div className={'container mx-auto flex justify-between items-center mb-20'}>
                    <Heading as="h1" size="7" className="mb-6 text-center text-white">
                        User Issues
                    </Heading>
                    <IssuesFilter defaultValue={status || undefined}/>
                    <Button size='2'><Link href={'/issues/new'}>Create new issue</Link></Button>
                </div>
                <div className="container mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {tasks.map((task) => (
                            <IssueCard key={task.id} task={task} handleDeleteTaskAction={handleDeleteTask}/>
                        ))}
                    </div>
                </div>
            </Box>
        </>
    );
};

export default IssuesPage;
