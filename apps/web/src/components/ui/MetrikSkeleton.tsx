export function MetrikSkeleton() {
    return (
        <div className="animate-pulse space-y-3 w-full">
            <div className="h-5 bg-card rounded-lg w-1/3" />
            <div className="h-24 bg-card rounded-2xl" />
            <div className="grid grid-cols-2 gap-3">
                <div className="h-20 bg-card rounded-xl" />
                <div className="h-20 bg-card rounded-xl" />
            </div>
            <div className="h-32 bg-card rounded-2xl" />
        </div>
    )
}
