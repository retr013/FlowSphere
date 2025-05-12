export default function DashboardSkeleton() {
    return (
        <div className="lg:min-h-screen p-8 flex-col container mx-auto animate-pulse text-white">
            <div className="flex flex-col-reverse lg:flex-row">
                <div className="lg:w-3/5 lg:pr-8 sm:w-full space-y-6">
                    <div className="h-8 w-48 bg-zinc-800 rounded" />
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="h-24 bg-zinc-800 rounded-lg p-4">
                                <div className="h-4 bg-zinc-700 rounded w-1/2 mb-2" />
                                <div className="h-6 bg-zinc-600 rounded w-1/3" />
                            </div>
                        ))}
                    </div>
                    <div className="h-72 bg-zinc-800 rounded-lg" />
                </div>
                <div className="lg:w-2/5 pl-0 lg:pl-8 sm:w-full space-y-4 mb-8 lg:mb-0">
                    <div className="h-8 w-48 bg-zinc-800 rounded" />
                    {[...Array(5)].map((_, idx) => (
                        <div key={idx} className="flex justify-between items-center p-4 bg-zinc-800 rounded-lg">
                            <div className="space-y-2">
                                <div className="h-4 w-32 bg-zinc-600 rounded" />
                                <div className="h-3 w-20 bg-zinc-700 rounded" />
                            </div>
                            <div className="h-6 w-20 bg-zinc-600 rounded-full" />
                        </div>
                    ))}
                </div>
            </div>
            <div className="py-8">
                <div className="h-8 w-48 bg-zinc-800 rounded mb-4" />
                <div className="space-y-3">
                    {[...Array(3)].map((_, idx) => (
                        <div key={idx} className="flex items-center p-4 bg-zinc-800 rounded-lg space-x-4">
                            <div className="w-10 h-10 rounded-full bg-zinc-700" />
                            <div className="space-y-2">
                                <div className="h-4 w-32 bg-zinc-600 rounded" />
                                <div className="h-3 w-20 bg-zinc-700 rounded" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
