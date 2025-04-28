const SkeletonIssueCard = () => {
    return (
        <div className="relative dark:bg-bgdark p-6 rounded-lg border border-gray-600 animate-pulse">
            <div className="h-6 bg-zinc-700 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-zinc-700 rounded w-full mb-5"></div>
            <div className="h-4 bg-zinc-700 rounded w-5/6 mb-5"></div>
            <div className="h-4 bg-zinc-700 rounded w-1/2 mb-2"></div>
            <div className="h-4 bg-zinc-700 rounded w-1/3 mb-6"></div>
        </div>
    );
};

const SkeletonIssuesPage = () => {
    return (
        <div className="p-7">
            <div className='flex justify-between items-center mb-24'>
                <div className="h-10 bg-bgdark rounded w-40"></div>
                <div className="h-9 bg-bgdark rounded w-34"></div>
            </div>
            <div className="container mx-auto p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {Array.from({ length: 6 }).map((_, index) => (
                        <SkeletonIssueCard key={index} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SkeletonIssuesPage;