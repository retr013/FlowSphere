import {LatestIssues} from "@/app/LatestIssues";
import {IssuesSummary} from "@/app/IssuesSummary";
import {prisma} from "@/prisma/client";
import {IssuesChart} from "@/app/IssuesChart";
import {UsersSummary} from "@/app/UsersSummary";

export default async function Home() {

    const open = await prisma.task.count({where: {status: 'OPEN'}});
    const inProgress = await prisma.task.count({where: {status: 'IN_PROGRESS'}});
    const closed = await prisma.task.count({where: {status: 'CLOSED'}});

    return (
        <div className="lg:min-h-screen p-8 flex-col container mx-auto">
            <div className='flex-col-reverse lg:flex-row lg:flex'>
                <div className="lg:w-3/5 lg:pr-8 sm:w-full">
                    <h1 className="text-3xl font-bold mb-6">Issues overview</h1>
                    <IssuesSummary open={open} inProgress={inProgress} closed={closed}/>
                    <IssuesChart open={open} inProgress={inProgress} closed={closed}/>
                </div>
                <div className="lg:w-2/5 pl-0 lg:pl-8 sm:w-full">
                    <h1 className="text-3xl font-bold mb-6">Latest issues</h1>
                    <div className="rounded-lg shadow-md">
                        <LatestIssues/>
                    </div>
                </div>
            </div>
            <div className='py-8'>
                <h1 className="text-3xl font-bold mb-6">Current users</h1>
                <UsersSummary/>
            </div>
        </div>
    )
}
