import type { IProfileType } from "../../types";

interface IUserCardProps {
    user: IProfileType;
    index: number;
    colors: {
        text: string;
        bg: string;
        textShadow: string;
    };
    ring: string;
}

export default function UserCard({
    user,
    index,
    colors,
    ring,
}: IUserCardProps) {
    return (
        <li
            className={`flex items-center w-full bg-button-background p-2 rounded-sm ${ring}`}
            key={user.id}
        >
            <span className="font-bold w-2/12">#{index}</span>
            <div className="flex gap-3 items-center w-6/12 sm:w-4/12">
                {user.avatar_url && (
                    <img
                        src={user.avatar_url}
                        alt=""
                        className="w-10 rounded-full"
                    />
                )}
                <p
                    className={`flex font-medium text-sm sm:text-base text-shadow-lg ${colors.text} ${colors.textShadow}`}
                >
                    {user.display_name}
                </p>
            </div>

            <div className="hidden sm:block w-2/12">
                <p
                    className={`flex items-center justify-center w-24 font-semibold self-start py-2 sm:px-2 lg:px-6 rounded-full ${colors.bg}`}
                >
                    {user.role}
                </p>
            </div>
            <p className="flex w-2/12">{user.points} Points</p>
            <p className="hidden sm:inline w-2/12">{user.created_at}</p>
        </li>
    );
}
