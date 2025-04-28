'use client';

import {Button} from "@radix-ui/themes";
import SignIn from "@/app/components/SignIn";
import {signIn} from "next-auth/react";

export default function Home() {

    return (
        <div>
            <h1 className='text-textColor'>Issue Tracker</h1>
            <div className='bg-primary dark:bg-bgdark dark:text-textdark'>Text</div>
            <Button>My button</Button>
            {/*<SignIn/>*/}
            <button onClick={() => signIn('google')}>llll</button>
        </div>
    )
}
