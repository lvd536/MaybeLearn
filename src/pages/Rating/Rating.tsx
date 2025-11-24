import { useEffect, useState } from "react";
import type { IProfileType } from "../../types";
import { getUserProfilesWithLimit } from "../../utils/profile";
import UserCard from "../../components/Rating/UserCard";
import TopColumns from "../../components/Rating/TopColumns";

export default function Rating() {
    const [topUsers, setTopUsers] = useState<IProfileType[]>([]);

    useEffect(() => {
        (async () => {
            const profiles = await getUserProfilesWithLimit(10);
            if (profiles) {
                profiles.forEach((profile) => {
                    profile.created_at = new Date(
                        profile.created_at as string
                    ).toDateString();
                });
                setTopUsers(profiles);
            }
        })();
    }, []);

    const getProfileColors = (user: IProfileType) => {
        return {
            text:
                user?.role === "moderator"
                    ? "text-blue-400"
                    : user?.role === "admin"
                    ? "text-red-500"
                    : "text-green-400",
            bg:
                user?.role === "moderator"
                    ? "bg-blue-400"
                    : user?.role === "admin"
                    ? "bg-red-500"
                    : "bg-green-400",
            textShadow:
                user?.role === "moderator"
                    ? "text-shadow-blue-400"
                    : user?.role === "admin"
                    ? "text-shadow-red-500"
                    : "text-shadow-green-400",
        };
    };

    return (
        <div>
            <h1 className="font-black text-2xl">Top Users Leaderboard</h1>
            <p className="text-white/50">
                See who's leading in MaybeLearn community
            </p>
            <ul className="flex flex-col gap-4 items-center justify-center mt-5">
                <TopColumns />
                {topUsers.map((user, userIndex) => {
                    userIndex += 1;
                    const userColors = getProfileColors(user);
                    const ring =
                        userIndex === 1
                            ? "ring-1 ring-yellow-500"
                            : userIndex === 2
                            ? "ring-1 ring-gray-500"
                            : userIndex === 3
                            ? "ring-1 ring-amber-800"
                            : "";
                    return (
                        <UserCard
                            key={user.id}
                            user={user}
                            index={userIndex}
                            colors={userColors}
                            ring={ring}
                        />
                    );
                })}
            </ul>
        </div>
    );
}
