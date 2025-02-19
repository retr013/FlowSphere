import Link from "next/link";
import {AiFillAlert} from "react-icons/ai";

export const NavBar = () => {

    const links = [
        {href: '/', label: 'Dashboard'},
        {href: '/issues', label: 'Issues'},
    ]

    return (
        <nav className={'flex border-b border-gray-200 p-4 items-center dark:bg-bgdark dark:text-textdark'}>
            <Link className='flex items-center text-xl' href='/'>
                <AiFillAlert size={45} />
                Bug report
            </Link>
            <ul className={'ml-auto flex space-x-4'}>
                {links.map(({href, label}) => (
                    <li key={`${href}${label}`}>
                        <Link className='text-zinc-500 hover:text-black transition-colors dark:text-gray-400 dark:hover:text-textdark' href={href}>{label}</Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
};
