import {prisma} from "@/prisma/client";
import {Box, Card, Flex, Text, Heading, Avatar} from "@radix-ui/themes"
import { getShortDate} from "@/app/utils/FormatDate";
import userPicture from "@/public/images/userPic.png";


export const UsersSummary = async () => {

    const users = await prisma.user.findMany({
        orderBy: {createdAt: 'desc'},
    });

    return (
        <Flex direction="column" gap="3">
            {users.map((user) => {
                return (
                    <Card
                        key={user.id}
                        className="cursor-pointer bg-zinc-800 border border-gray-700 hover:scale-105 duration-300 transition"
                    >
                            <Flex justify="start" align="center" gap='3'>
                                <Avatar src={user!.image! || userPicture.src}
                                        fallback={<div className="w-8 h-8 rounded-full bg-gray-300 animate-pulse"></div>}
                                        radius="full" size="2" className="cursor-pointer"/>
                                <Box>
                                    <Heading size="3" className="mb-1">
                                        {user.name}
                                    </Heading>
                                    <Heading size="3" className="mb-1">
                                        {user.username}
                                    </Heading>
                                    <Flex align="center" gap="2">
                                        <Text size="1" className="text-gray-500">
                                            {getShortDate(user.createdAt)}
                                        </Text>
                                    </Flex>
                                </Box>
                            </Flex>
                    </Card>
                )
            })}
        </Flex>
    );
};
