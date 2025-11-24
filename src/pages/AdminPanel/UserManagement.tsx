import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProfilesInRange, removeProfileById } from "../../utils/profile";
import type { IProfileType } from "../../types";
import NavButtons from "../../components/AdminPanel/UserAdmin/Management/NavButtons";
import UserInfo from "../../components/AdminPanel/UserAdmin/Management/UserInfo";
import UserActions from "../../components/AdminPanel/UserAdmin/Management/UserActions";

export default function UserManagement() {
    const [users, setUsers] = useState<IProfileType[]>();
    const { page } = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        (async () => {
            const pageNumber = parseInt(page || "1");
            const users = await getProfilesInRange(
                pageNumber === 1 ? pageNumber : (pageNumber - 1) * 10 + 1
            );
            if (users) {
                setUsers(users);
            }
        })();
    }, [page]);

    const handleRemove = (userId: number) => {
        const confirmed = confirm(`Are you sure you want to delete this user?`);

        if (confirmed) {
            removeProfileById(userId);
        }
    };

    return (
        <div className="flex flex-col w-full items-center justify-between">
            {users?.map((user) => (
                <div
                    className="flex w-full m-2 p-2 bg-catalog-card rounded-sm items-center justify-between"
                    key={user.id}
                >
                    <UserInfo
                        display_name={user.display_name}
                        avatar_url={user.avatar_url}
                        role={user.role}
                        created_at={user.created_at}
                    />
                    <UserActions
                        handleRemove={() => handleRemove(user.id)}
                        navigate={navigate}
                        id={user.id}
                    />
                </div>
            ))}
            <NavButtons
                page={page || "1"}
                nextButtonActive={(users && users.length > 9) || false}
                previousButtonActive={parseInt(page || "1") > 1}
                navigate={navigate}
            />
        </div>
    );
}
