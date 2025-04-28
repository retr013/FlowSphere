'use client'
import {Select} from "@radix-ui/themes";
import {Task, User} from "@prisma/client";
import axios from "axios";
import {useQuery} from "@tanstack/react-query";
import {Loader} from "@/app/components/Loader";
import toast, {Toaster} from "react-hot-toast";

export const UserSelector = ({issue}: { issue: Task }) => {

    const {isLoading, data: users, error} = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const {data} = await axios.get<User[]>('/api/users');
            return data;
        },
        staleTime: 1000 * 60, // 1 minute
        retry: 3
    })

    if (isLoading) return <Loader/>

    if (error) return null

    function assignUser(userId: string) {
        axios.put(`/api/issues`, {
            assignedToUserId: userId === "Unassigned" ? null : userId,
            id: issue.id
        })
            .then(() => toast.success('User ' + (userId === 'Unassigned' ? 'unassigned' : 'assigned') + ' successfully'))
            .catch(() => toast.error('Error updating issue'))
    }

    return (
        <>
            <Select.Root defaultValue={issue?.assignedToUserId || ''}
                         onValueChange={assignUser}>
                <Select.Trigger className="SelectTrigger" aria-label="User" placeholder='Select a user'/>
                <Select.Content>
                    <Select.Group>
                        <Select.Label>Select a user label</Select.Label>
                        <Select.Item value={'Unassigned'}>Unassign</Select.Item>
                        {users?.map((user) => (
                            <Select.Item key={user.id} value={user.id.toString()}>
                                {user.name}
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
