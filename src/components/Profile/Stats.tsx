import { useAuthStore } from "../../stores/useAuthStore";
import StatsCard from "./StatsCard";

export default function Stats() {
    const completedTest = useAuthStore((state) => state.completedTests);
    const completedCourses = useAuthStore((state) => state.completedCourses);
    const points = useAuthStore((state) => state.profile?.points);
    return (
        <div className="flex flex-col gap-3">
            <span className="font-bold text-2xl">Stats</span>
            <ul className="flex gap-2 items-center justify-between">
                <StatsCard name="Tests Completed" value={completedTest} />
                <StatsCard name="Courses Completed" value={completedCourses} />
                <StatsCard name="Points" value={points || 0} />
            </ul>
        </div>
    );
}
