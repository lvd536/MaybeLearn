interface IUserInfo {
    display_name: string;
    role: string;
    created_at: string | undefined;
    avatar_url: string;
}

export default function UserInfo({
    display_name,
    avatar_url,
    role,
    created_at,
}: IUserInfo) {
    return (
        <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
                <img src={avatar_url} alt="" className="w-12 rounded-full" />
                <div className="flex flex-col justify-center items-start">
                    <p className="font-medium text-sm">{display_name}</p>
                    <p
                        className={`flex justify-center text-xs rounded-sm p-0.5 ${
                            role === "moderator"
                                ? "bg-blue-400"
                                : role === "admin"
                                ? "bg-red-500"
                                : "bg-green-400"
                        }`}
                    >
                        {role}
                    </p>
                </div>
            </div>
            <p className="text-white/15 text-sm">
                {new Date(created_at as string).toDateString()}
            </p>
        </div>
    );
}
