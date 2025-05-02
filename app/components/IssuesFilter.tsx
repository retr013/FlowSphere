'use client';

import {Status} from "@prisma/client";
import {Select} from "@radix-ui/themes";
import { useRouter } from "next/navigation";

const statusOptions: { value: string, label?: Status }[] = [
    {value: 'All',},
    {value: 'Open', label: 'OPEN'},
    {value: 'In progress', label: 'IN_PROGRESS'},
    {value: 'Closed', label: 'CLOSED'},
]

export const IssuesFilter = ({defaultValue}: {defaultValue: Status | undefined}) => {

    const router = useRouter();

    function filterIssues(status: string) {
        const query = status === 'undefined' ? '' : `?status=${status}`;
        router.push(`/issues${query}`);
    }

    return (
        <div>
            <Select.Root onValueChange={filterIssues} defaultValue={defaultValue || ''}>
                <Select.Trigger placeholder='Filter by status' className='w-48'/>
                <Select.Content>
                    <Select.Group>
                        <Select.Label>Filter by status</Select.Label>
                        {statusOptions.map((option) => (
                            <Select.Item key={option.value} value={option.label || 'undefined'}>
                                {option.value}
                            </Select.Item>
                        ))}
                    </Select.Group>
                </Select.Content>
            </Select.Root>
        </div>
    );
};
