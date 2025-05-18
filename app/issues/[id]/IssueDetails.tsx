import {Box, Button, Flex, Heading, Text} from "@radix-ui/themes";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import {IssueStatusBadge} from "@/app/components/IssueStatusBadge";
import {Task} from "@prisma/client";

export const IssueDetails = ({issue}: { issue: Task }) => {
    return (
        <Flex direction="column" gap="4">
            <Flex justify="between" align="center">
                <Heading as="h1" size={{ initial: "4", md: "6", lg: "8" }} className="text-white">
                    {issue.title}
                </Heading>
                <Button asChild variant="soft">
                    <Link href="/issues">Back to Issues</Link>
                </Button>
            </Flex>
            <Box className="prose bg-black p-4 rounded-lg text-white">
                <ReactMarkdown>{issue.description}</ReactMarkdown>
            </Box>
            <Flex justify="between" align="center">
                <IssueStatusBadge status={issue.status}/>
                <Text className="text-gray-400 text-sm md:text-md">
                    Created on: {issue.createdAt.toDateString()}
                </Text>
            </Flex>
        </Flex>
    );
};