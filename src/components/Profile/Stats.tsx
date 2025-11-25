import { useAuthStore } from "../../stores/useAuthStore";
import StatsCard from "./StatsCard";

interface IStats {
    completedTests: number;
    completedCourses: number;
}

export default function Stats({completedCourses, completedTests}: IStats) {
    const elo = useAuthStore((state) => state.profile?.elo);
    return (
        <div className="flex flex-col gap-3">
            <span className="font-bold text-xl">Stats</span>
            <ul className="flex gap-2 items-center justify-between">
                <StatsCard name="Tests Completed" value={completedTests} />
                <StatsCard name="Courses Completed" value={completedCourses} />
                <StatsCard name="Elo" value={elo || 0} />
            </ul>
        </div>
    );
}
