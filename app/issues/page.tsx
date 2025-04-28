import {Box, Button, Heading} from "@radix-ui/themes";
import Link from "next/link";
import {IssueCard} from "@/app/issues/IssuesCard";
import {prisma} from "@/prisma/client";
import {revalidatePath} from "next/cache";

async function handleDeleteTask(taskId: number) {
    "use server";
    try {
        await prisma.task.delete({ where: { id: taskId } });
        revalidatePath("/issues"); // Refresh the page to update UI
    } catch (error) {
        console.error("Failed to delete task:", error);
    }
}

const IssuesPage = async () => {

    const tasks = await prisma.task.findMany();

    return (
        <>
            <Box className="p-6">
                <div className={'flex justify-between items-center mb-20'}>
                    <Heading as="h1" size="7" className="mb-6 text-center text-white">
                        User Issues
                    </Heading>
                    <Button size='2'><Link href={'/issues/new'}>Create new issue</Link></Button>
                </div>
                <div className="container mx-auto p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {tasks.map((task) => (
                            <IssueCard key={task.id} task={task} handleDeleteTask={handleDeleteTask}/>
                        ))}
                    </div>
                </div>
            </Box>
        </>
    );
};

export default IssuesPage;
