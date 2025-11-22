export default function DevInfo() {
    return (
        <div className="flex flex-col gap-2 items-center justify-center bg-button-background/30 p-2 rounded-sm mb-5 sm:mb-0">
            <span className="text-xs sm:text-base bg-button-background/70 p-2 rounded-sm">
                Dev info
            </span>
            <div className="flex flex-col text-xs sm:text-base gap-2 items-center justify-center bg-button-background/80 p-2 rounded-sm">
                <span>Creator: lvd.</span>
                <span>Build state: dev</span>
                <span>DB: supabase</span>
            </div>
        </div>
    );
}
