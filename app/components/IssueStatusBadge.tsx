import {Status} from "@prisma/client";
import {Badge} from "@radix-ui/themes";

const statusMap: Record<Status, { label: string, color: 'red' | 'yellow' | 'green' }> = {
    OPEN: {label: "Open", color: "red"},
    IN_PROGRESS: {label: "In Progress", color: "yellow"},
    CLOSED: {label: "Closed", color: "green"},
}

export const IssueStatusBadge = ({status}: { status: Status }) => {

    return (
        <div className={'my-2.5'}>
            <Badge color={statusMap[status].color}>
                {statusMap[status].label}
            </Badge>
        </div>
    );
};
