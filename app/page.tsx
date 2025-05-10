import {LatestIssues} from "@/app/LatestIssues";
import {IssuesSummary} from "@/app/IssuesSummary";
import {prisma} from "@/prisma/client";
import {IssuesChart} from "@/app/IssuesChart";

export default async function Home() {

    const open = await prisma.task.count({where: {status: 'OPEN'}});
    const inProgress = await prisma.task.count({where: {status: 'IN_PROGRESS'}});
    const closed = await prisma.task.count({where: {status: 'CLOSED'}});

    return (
        <div className="min-h-screen p-8 flex">
            <div className="w-3/5 pr-8">
                <h1 className="text-3xl font-bold mb-6">Issues overview</h1>
                <IssuesSummary open={open} inProgress={inProgress} closed={closed}/>
                <IssuesChart open={open} inProgress={inProgress} closed={closed}/>
            </div>
            <div className="w-2/5 pl-8">
                <h1 className="text-3xl font-bold mb-6">Latest issues</h1>
                <div className="rounded-lg shadow-md">
                    <LatestIssues/>
                </div>
            </div>
        </div>
    )
}
