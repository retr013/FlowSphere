'use client'

import {ResponsiveContainer, BarChart, XAxis, YAxis, Bar, Cell} from "recharts";

interface Props {
    open: number
    inProgress: number
    closed: number
}

export const IssuesChart = ({open, inProgress, closed} : Props) => {

    const data = [
        {label: 'Open', value: open, color: 'var(--green-a11)'},
        {label: 'In Progress', value: inProgress, color: 'var(--yellow-a11)'},
        {label: 'Closed', value: closed, color: 'var(--red-a11)'},
    ]

    const colors = ['var(--blue-a11)', 'var(--yellow-a11)', 'var(--red-a11)'];

    return (
        <div>
            <ResponsiveContainer width='100%' height={300}>
                <BarChart data={data}>
                    <XAxis dataKey="label" />
                    <YAxis />
                    <Bar dataKey="value" barSize={100}>
                        {data.map((column, index) => (
                            <Cell key={`cell-${index}`} fill={column.color} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};
