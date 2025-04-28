import React from "react";
import {AlertDialog, Button} from "@radix-ui/themes";
import {Loader} from "@/app/components/Loader";

interface Props {
    handleDeleteTask: (id: number) => Promise<void>,
    taskId: number
}

export const TaskDeleteButton = ({handleDeleteTask, taskId}: Props) => {

    const [error, setError] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const onDelete = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        try {
            setLoading(true);
            await handleDeleteTask(taskId);
            setLoading(false);
        } catch (error) {
            setError(true)
            console.error("Failed to delete task:", error);
            setLoading(false);
        }
    };

    return (
        <>
            <AlertDialog.Root >
                <AlertDialog.Trigger>
                    <Button size='2' color='ruby'>Delete task</Button>
                </AlertDialog.Trigger>
                <AlertDialog.Content className="AlertDialogContent">
                    <AlertDialog.Title className="AlertDialogTitle">
                        Do you want to delete this task?
                    </AlertDialog.Title>
                    <AlertDialog.Description className="AlertDialogDescription">
                        This action cannot be undone.
                    </AlertDialog.Description>
                    <div style={{display: "flex", gap: 25, justifyContent: "flex-end"}}>
                        <AlertDialog.Cancel>
                            <Button size='2' type='reset' color='gray'>Cancel</Button>
                        </AlertDialog.Cancel>
                        <AlertDialog.Action>
                            <Button size='2' color='ruby' onClick={onDelete}>
                                Yes, delete task{loading && <Loader/>}
                            </Button>
                        </AlertDialog.Action>
                    </div>
                </AlertDialog.Content>
            </AlertDialog.Root>
            <AlertDialog.Root open={error}>
                <AlertDialog.Content>
                    <AlertDialog.Title className="AlertDialogTitle">Error</AlertDialog.Title>
                    <AlertDialog.Description className="AlertDialogDescription">The task was not deleted</AlertDialog.Description>
                    <Button variant='soft' color='gray' mt='4' onClick={() => setError(false)}>Close</Button>
                </AlertDialog.Content>
            </AlertDialog.Root>
        </>
    );
};

export default TaskDeleteButton;