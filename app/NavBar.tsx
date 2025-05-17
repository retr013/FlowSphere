'use client'

import Link from "next/link";
import { redirect, usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { Avatar, Box, Button } from "@radix-ui/themes";
import { DropdownMenu } from "radix-ui";
import Logo from "@/app/components/Logo";
import userPicture from "@/public/images/userPic.png";

export const NavBar = () => {
    return (
        <nav className="flex flex-wrap p-4 items-center justify-between gap-4 dark:bg-bgdark dark:text-textdark">
            <Link className="flex items-center gap-1.5 text-base sm:text-xl" href="/">
                <Logo />
                <span className="hidden sm:inline text-base sm:text-xl">FlowSphere</span>
            </Link>
            <div className="flex items-center gap-4 ml-auto">
                <Links />
                <UserAvatarMenu />
            </div>
        </nav>
    );
};

function UserAvatarMenu() {
    const { status, data: session } = useSession();

    if (status === "loading") {
        return <div className="w-8 h-8 rounded-full bg-gray-300 animate-pulse" />;
    }

    if (status === "unauthenticated") {
        return <Button onClick={() => redirect('/auth/signin')}>Sign in</Button>;
    }

    return (
        <Box>
            <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                    <Avatar
                        src={session?.user?.image || userPicture.src}
                        fallback={<div className="w-8 h-8 rounded-full bg-gray-300 animate-pulse" />}
                        radius="full"
                        referrerPolicy="no-referrer"
                        size="2"
                        className="cursor-pointer"
                    />
                </DropdownMenu.Trigger>
                <DropdownMenu.Content className="bg-zinc-800 p-3">
                    <DropdownMenu.Item className="outline-none">
                        <div className="px-2 py-1 text-sm text-gray-400">
                            Signed in as {session?.user?.email}
                        </div>
                    </DropdownMenu.Item>
                    <DropdownMenu.Separator className="h-px bg-gray-700 my-1" />
                    <DropdownMenu.Item className="outline-none">
                        <Button onClick={() => signOut()}>Sign Out</Button>
                    </DropdownMenu.Item>
                </DropdownMenu.Content>
            </DropdownMenu.Root>
        </Box>
    );
}

const Links = () => {
    const pathname = usePathname();

    const links = [
        { href: '/', label: 'Dashboard' },
        { href: '/issues', label: 'Issues' },
    ];

    return (
        <ul className="flex space-x-2 sm:space-x-4">
            {links.map(({ href, label }) => (
                <li key={`${href}${label}`}>
                    <Link
                        className={`${
                            pathname === href
                                ? 'bg-zinc-600 dark:text-textdark text-textlight'
                                : 'text-zinc-500 hover:text-black dark:text-gray-400 dark:hover:text-textdark'
                        } rounded-xl px-2 py-1 text-sm sm:text-base transition-all duration-300`}
                        href={href}
                    >
                        {label}
                    </Link>
                </li>
            ))}
        </ul>
    );
};
