export default function DevInfo() {
    return (
        <li className="flex flex-col gap-2 items-center justify-center bg-button-background/30 p-2 rounded-sm">
            <span className="bg-button-background/70 p-2 rounded-sm">
                Dev info
            </span>
            <div className="flex flex-col gap-2 items-center justify-center bg-button-background/80 p-2 rounded-sm">
                <span>Creator: lvd.</span>
                <span>Build state: dev</span>
                <span>DB: supabase</span>
            </div>
        </li>
    );
}
