import {NextRequest, NextResponse} from "next/server";
import {prisma} from "@/prisma/client";
import {patchTaskSchema, TaskSchema} from "@/app/validationSchemas";
import {auth} from "@/auth";

export async function POST(request: NextRequest) {

    const session = await auth()

    if (!session) {
        return NextResponse.json({message: 'Unauthorized'}, {status: 401});
    }

    const body = await request.json();

    const validation = TaskSchema.safeParse(body);

    if (!validation.success) {
        return NextResponse.json({message: validation.error.format()}, {status: 400});
    }

    const {title, description} = validation.data;

    const issue = await prisma.task.create({
        data: {
            title,
            description,
        }
    });

    return NextResponse.json(issue, {status: 201});
}

export async function GET() {
    const issues = await prisma.task.findMany();
    return NextResponse.json(issues);
}

export async function PUT(request: NextRequest) {

    const session = await auth()

    if (!session) {
        return NextResponse.json({message: 'Unauthorized'}, {status: 401});
    }

    const body = await request.json();
    const validation = patchTaskSchema.safeParse(body);

    if (!validation.success) {
        return NextResponse.json({message: validation.error.format()}, {status: 400});
    }

    if (validation.data.assignedToUserId) {
        let user = await prisma.user.findFirst({
            where: {
                id: validation.data.assignedToUserId
            }
        });
        if (!user) {
            return NextResponse.json({message: 'User not found'}, {status: 404});
        }
    }

    const {title, description, id, assignedToUserId, status} = validation.data;

    const issue = await prisma.task.update({
        where: {
            id: id
        },
        data: {
            title,
            description,
            assignedToUserId,
            status
        }
    });

    return NextResponse.json(issue);
}

export async function DELETE(request: NextRequest) {

    const session = await auth()

    if (!session) {
        return NextResponse.json({message: 'Unauthorized'}, {status: 401});
    }

    const body = await request.json();
    debugger
    const issue = await prisma.task.delete({
        where: {
            id: body.id
        }
    });

    return NextResponse.json(issue);
}