import {Status} from "@prisma/client";
import {Flex} from "@radix-ui/themes";
import Link from "next/link";

interface Props {
    open: number
    inProgress: number
    closed: number
}

export const IssuesSummary = ({open, inProgress, closed} : Props) => {

    const columns:{label: string, value: number, status: Status}[] = [
        {label: 'Open issues', value: open, status: 'OPEN'},
        {label: 'Issues in progress', value: inProgress, status: 'IN_PROGRESS'},
        {label: 'Closed issues', value: closed, status: 'CLOSED'},
    ]

    return (
        <Flex>
            {columns.map((column) => (
                <Flex
                    key={column.label}
                    direction="column"
                    align="center"
                    gap="1"
                    className="bg-zinc-800 border border-gray-700 rounded-lg p-4 m-2 w-1/3 hover:scale-105 duration-300 transition"
                >
                    <Link href={`/issues?status=${column.status}`} className="w-full h-full flex flex-col items-center">
                        <h3 className="text-lg font-bold">{column.label}</h3>
                        <p className="text-xl font-semibold">{column.value}</p>
                    </Link>
                </Flex>
            ))}
        </Flex>
    );
};
