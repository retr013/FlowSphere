'use client'

import dynamic from "next/dynamic";
import IssuesFormLoader from "@/app/components/IssuesFormLoader";

const IssuesForm = dynamic(() => import('@/app/issues/IssuesForm'), {
    ssr: false,
    loading: () => <IssuesFormLoader/>,
});

const NewIssuePage = () => {
    return (
        <div className='pt-16 mx-6'>
            <IssuesForm/>
        </div>
    );
};

export default NewIssuePage;