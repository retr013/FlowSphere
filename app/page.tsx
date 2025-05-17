import { LatestIssues } from "@/app/LatestIssues";
import { IssuesSummary } from "@/app/IssuesSummary";
import { prisma } from "@/prisma/client";
import { IssuesChart } from "@/app/IssuesChart";
import { UsersSummary } from "@/app/UsersSummary";

export default async function Home() {
    const open = await prisma.task.count({ where: { status: 'OPEN' } });
    const inProgress = await prisma.task.count({ where: { status: 'IN_PROGRESS' } });
    const closed = await prisma.task.count({ where: { status: 'CLOSED' } });

    return (
        <div className="container mx-auto p-4 sm:p-6 lg:p-8 flex-col">
            <div className="flex flex-col-reverse gap-8 lg:flex-row">
                <div className="lg:w-3/5 lg:pr-8 w-full">
                    <h1 className="text-xl sm:text-3xl font-bold mb-4 sm:mb-6">Issues overview</h1>
                    <IssuesSummary open={open} inProgress={inProgress} closed={closed} />
                    <IssuesChart open={open} inProgress={inProgress} closed={closed} />
                </div>
                <div className="lg:w-2/5 lg:pl-8 w-full">
                    <h1 className="text-xl sm:text-3xl font-bold mb-4 sm:mb-6">Latest issues</h1>
                    <div className="rounded-lg shadow-md">
                        <LatestIssues />
                    </div>
                </div>
            </div>
            <div className="py-6 sm:py-8">
                <h1 className="text-xl sm:text-3xl font-bold mb-4 sm:mb-6">Current users</h1>
                <UsersSummary />
            </div>
        </div>
    );
}
