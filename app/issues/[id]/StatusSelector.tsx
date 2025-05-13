'use client';

import {Select} from "@radix-ui/themes";
import {Status, Task} from "@prisma/client";
import axios from "axios";
import toast, {Toaster} from "react-hot-toast";
import {useRouter} from "next/navigation";

interface Props {
    issue: Task,
}


const StatusSelector = ({ issue }: Props) => {

    const router = useRouter()

    const statuses = [
        {value: 'OPEN', label: 'Open'},
        {value: 'IN_PROGRESS', label: 'In Progress'},
        {value: 'CLOSED', label: 'Closed'}
    ]

    function assignStatus(status: Status) {
        axios.put(`/api/issues`, {
            status: status,
            id: issue.id
        })
            .then(() => toast.success('Status changed successfully'))
            .catch(() => toast.error('Error updating issue'))
            .finally(router.refresh)
    }

    return (
        <>
            <Select.Root defaultValue={issue?.status || ''}
                         onValueChange={assignStatus}>
                <Select.Trigger className="SelectTrigger" aria-label="User" placeholder='Select a user'/>
                <Select.Content>
                    <Select.Group>
                        <Select.Label>Change the status</Select.Label>
                        {statuses?.map((status) => (
                            <Select.Item key={status.value} value={status.value}>
                                {status.label}
                            </Select.Item>
                        ))}
                    </Select.Group>
                </Select.Content>
            </Select.Root>
            <Toaster position="top-center"
                reverseOrder={false}
                toastOptions={{
                    className: '',
                    duration: 5000,
                    style: {
                        background: '#333',
                        color: '#fff',
                    },
                }}
            />
        </>
    );
};

export default StatusSelector;
