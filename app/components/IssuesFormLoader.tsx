const FormSkeleton = () => {
    return (
        <div className="flex justify-center items-start px-4 animate-pulse">
            <div className="w-full max-w-2xl space-y-6 bg-[#1f1f22] p-8 rounded-xl shadow-lg border border-[#2a2a2e] animate-pulse">
                <div className="h-7 w-1/3 bg-[#2e2e33] rounded" />
                <div className="h-10 bg-[#2e2e33] rounded w-full" />
                <div className="h-90 bg-[#2e2e33] rounded w-full" />
                <div className="h-6 w-1/4 bg-[#2e2e33] rounded" />
            </div>
        </div>

    );
};

export default FormSkeleton;
