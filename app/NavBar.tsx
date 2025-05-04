'use client'

import Link from "next/link";
import {AiFillAlert} from "react-icons/ai";
import {redirect, usePathname} from "next/navigation";
import {signOut, useSession} from "next-auth/react";
import {Avatar, Box, Button} from "@radix-ui/themes";
import {DropdownMenu} from "radix-ui";
import Logo from "@/app/components/Logo";

export const NavBar = () => {

    return (
        <nav className={'flex p-4 items-center dark:bg-bgdark dark:text-textdark'}>
            <Link className='flex items-center text-xl gap-1.5' href='/'>
                <Logo/>
                FlowSphere
            </Link>
            <Links/>
            <UserAvatarMenu/>
        </nav>
    );
};

function UserAvatarMenu() {

    const {status, data: session} = useSession()

    if (status === "loading") {
        return (<div className="w-8 h-8 rounded-full bg-gray-300 animate-pulse"></div>)
    }

    if (status === "unauthenticated") {
        return <Button onClick={() => redirect('/auth/signin')}>Sign in</Button>
    }

    return (
        <Box>
            <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                    <Avatar src={session!.user!.image!}
                            fallback={<div className="w-8 h-8 rounded-full bg-gray-300 animate-pulse"></div>}
                            radius="full" referrerPolicy="no-referrer" size="2" className="cursor-pointer"/>
                </DropdownMenu.Trigger>
                <DropdownMenu.Content className="bg-zinc-800 p-3">
                    <DropdownMenu.Item className='outline-none'>
                        <div className="px-2 py-1 text-sm text-gray-400">Signed in as {session?.user?.email}</div>
                    </DropdownMenu.Item>
                    <DropdownMenu.Separator className="h-px bg-gray-700 my-1" />
                    <DropdownMenu.Item className='outline-none'>
                        <Button onClick={() => signOut()}>
                            Sign Out
                        </Button>
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
        <ul className={'ml-auto flex space-x-4 mr-4'}>
            {links.map(({ href, label }) => (
                <li key={`${href}${label}`}>
                    <Link
                        className={`${pathname === href ? 'bg-zinc-600 dark:text-textdark text-textlight transition-all duration-300' : ''} text-zinc-500 hover:text-black transition-colors dark:text-gray-400 dark:hover:text-textdark rounded-xl p-2`}
                        href={href}
                    >
                        {label}
                    </Link>
                </li>
            ))}
        </ul>
    );
};