import {prisma} from "@/prisma/client";
import { Box, Card, Flex, Text, Heading, Badge, Button, Avatar, ScrollArea, Select, Tooltip } from "@radix-ui/themes"
import { getShortDate} from "@/app/utils/FormatDate";
import {IssueStatusBadge} from "@/app/components/IssueStatusBadge";
import Link from "next/link";

export const LatestIssues = async () => {

    const issues = await prisma.task.findMany({
        orderBy: {createdAt: 'desc'},
        take: 5,
    });

    return (
        <Flex direction="column" gap="3">
            {issues.map((issue) => {
                return (
                    <Card
                        key={issue.id}
                        className="cursor-pointer bg-zinc-800 border border-gray-700 hover:scale-105 duration-300 transition"
                    >
                        <Link href={`/issues/${issue.id}`} className='py-2'>
                            <Flex justify="between" align="center">
                                <Box>
                                    <Heading size="3" className="mb-1">
                                        {issue.title}
                                    </Heading>
                                    <Flex align="center" gap="2">
                                        <Text size="1" className="text-gray-500">
                                            {getShortDate(issue.createdAt)}
                                        </Text>
                                    </Flex>
                                </Box>
                                <IssueStatusBadge status={issue.status}/>
                            </Flex>
                        </Link>
                    </Card>
                )
            })}
        </Flex>
    );
};
