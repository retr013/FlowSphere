// import {prisma} from "@/prisma/client";
// import {notFound} from "next/navigation";
// import {Box, Flex} from "@radix-ui/themes";
// import {IssueDetails} from "@/app/issues/[id]/IssueDetails";
// import {UserSelector} from "@/app/issues/[id]/UserSelector";
// import {StatusSelectorWrapper} from "@/app/issues/[id]/StatusSelectorWrapper";
// import {Metadata} from "next";
//
// export const metadata: Metadata = {
//     title: "Issue Details | FlowSphere",
//     description: "View and edit the issue details",
//     openGraph: {
//         title: "Issue Details | FlowSphere",
//         description: "View and edit the issue details",
//         type: "website",
//     }
// }
//
// interface Props {
//     params: { id: string };
// }
//
// const IssueDetailPage = async ({params}: Props) => {
//
//     const id = parseInt(params.id as string);
//
//     const issue = await prisma.task.findUnique({
//         where: {id},
//     });
//
//     if (!issue) {
//         notFound();
//     }
//
//     return (
//         <Box className="max-w-3xl mx-auto p-6 bg-bgdark text-white shadow-lg rounded-lg mt-16">
//             <IssueDetails issue={issue}/>
//             <Flex gap={'3'} className="mt-2">
//                 <UserSelector issue={issue}/>
//                 <StatusSelectorWrapper issue={issue} />
//             </Flex>
//         </Box>
//     );
// };
//
// export default IssueDetailPage;

import {prisma} from "@/prisma/client";
import {notFound} from "next/navigation";
import {Box, Flex} from "@radix-ui/themes";
import {IssueDetails} from "@/app/issues/[id]/IssueDetails";
import {UserSelector} from "@/app/issues/[id]/UserSelector";
import {StatusSelectorWrapper} from "@/app/issues/[id]/StatusSelectorWrapper";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: "Issue Details | FlowSphere",
    description: "View and edit the issue details",
    openGraph: {
        title: "Issue Details | FlowSphere",
        description: "View and edit the issue details",
        type: "website",
    }
}

type Params = Promise<{ id: string }>


const IssueDetailPage = async ({params}: {params: Params}) => {

    const resolvedParams = await params;

    const id = parseInt(resolvedParams.id as string);

    const issue = await prisma.task.findUnique({
        where: {id},
    });

    if (!issue) {
        notFound();
    }

    return (
        <div className='px-6 max-w-3xl mx-auto mt-16'>
            <Box className="w-full mx-auto p-6 bg-bgdark text-white shadow-lg rounded-lg">
                <IssueDetails issue={issue}/>
                <Flex gap={'3'} className="mt-2">
                    <UserSelector issue={issue}/>
                    <StatusSelectorWrapper issue={issue} />
                </Flex>
            </Box>
        </div>
    );
};

export default IssueDetailPage;
