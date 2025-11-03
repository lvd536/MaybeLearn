import StatsCard from "./StatsCard";

export default function Body() {
    return (
        <div className="flex flex-col gap-3">
            <span className="font-bold text-2xl">Stats</span>
            <ul className="flex gap-2 items-center justify-between">
                <StatsCard name="Tests Completed" value={111} />
                <StatsCard name="Courses Completed" value={222} />
                <StatsCard name="Points" value={333} />
            </ul>
        </div>
    );
}
