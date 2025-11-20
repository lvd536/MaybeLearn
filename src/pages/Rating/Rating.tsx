import { useEffect, useState } from "react";
import type { IProfileType } from "../../types";
import { getUserProfilesWithLimit } from "../../utils/profile";

export default function Rating() {
    const [topUsers, setTopUsers] = useState<IProfileType[]>([]);

    useEffect(() => {
        (async () => {
            const profiles = await getUserProfilesWithLimit(10);
            if (profiles) {
                profiles.forEach((profile) => {
                    profile.created_at = new Date(
                        profile.created_at
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
                <ul className="flex items-center self-start w-full">
                    <li className="font-bold w-2/12">Rank</li>
                    <li className="font-bold w-6/12 sm:w-4/12">Player</li>
                    <li className="hidden sm:block font-bold w-2/12">Role</li>
                    <li className="font-bold w-2/12">Points</li>
                    <li className="hidden sm:block font-bold w-2/12">Joined</li>
                </ul>
                {topUsers.map((user, userIndex) => {
                    const userColors = getProfileColors(user);
                    const ring =
                        userIndex === 0
                            ? "ring-1 ring-yellow-500"
                            : userIndex === 1
                            ? "ring-1 ring-gray-500"
                            : userIndex === 2
                            ? "ring-1 ring-amber-800"
                            : "";
                    return (
                        <li
                            className={`flex items-center w-full bg-button-background p-2 rounded-sm ${ring}`}
                            key={user.id}
                        >
                            <span className="font-bold w-2/12">
                                #{userIndex + 1}
                            </span>
                            <div className="flex gap-3 items-center w-6/12 sm:w-4/12">
                                {user.avatar_url && (
                                    <img
                                        src={user.avatar_url}
                                        alt=""
                                        className="w-10 rounded-full"
                                    />
                                )}
                                <p
                                    className={`flex font-medium text-sm sm:text-base text-shadow-lg ${userColors.text} ${userColors.textShadow}`}
                                >
                                    {user.display_name}
                                </p>
                            </div>

                            <div className="hidden sm:block w-2/12">
                                <p
                                    className={`font-semibold self-start w-fit py-2 sm:px-2 lg:px-6 rounded-full ${userColors.bg}`}
                                >
                                    {user.role}
                                </p>
                            </div>
                            <p className="flex w-2/12">{user.points} Points</p>
                            <p className="hidden sm:inline w-2/12">
                                {user.created_at}
                            </p>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
