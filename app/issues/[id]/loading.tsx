import { Box, Flex, Skeleton } from "@radix-ui/themes";


const IssueDetailLoading = () => {
    return (
        <Box className="max-w-3xl mx-auto p-6 bg-bgdark text-white shadow-lg rounded-lg mt-16">
            <Flex direction="column" gap="4">
                <Flex justify="between" align="center">
                    <Skeleton className="h-8 w-48 rounded" />
                    <Skeleton className="h-10 w-24 rounded" />
                </Flex>
                <Box className="prose bg-black p-4 rounded-lg text-white">
                    <Skeleton className="h-32 w-full rounded" />
                </Box>
                <Flex justify="between" align="center">
                    <Skeleton className="h-6 w-24 rounded" />
                    <Skeleton className="h-6 w-40 rounded" />
                </Flex>
            </Flex>
        </Box>
    );
};

export default IssueDetailLoading;
