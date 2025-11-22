import { DevInfo, NavItem } from "../../components/AdminPanel";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../stores/useAuthStore";

type Pages = "" | "course" | "test";

export default function AdminPanel() {
    const { pathname } = useLocation();
    const entityName = pathname.split("/")[2];
    const profile = useAuthStore((state) => state.profile);
    const navigate = useNavigate();
    const handleClick = (page: Pages) => {
        navigate(page);
    };
    if (profile?.role !== "admin" || !profile) navigate("/profile");
    return (
        <div className="flex">
            <nav>
                <ul className="flex flex-col gap-5">
                    <NavItem
                        isActive={entityName === undefined}
                        onClick={() => handleClick("")}
                    >
                        Info
                    </NavItem>
                    <NavItem
                        isActive={entityName === "course"}
                        onClick={() => handleClick("course")}
                    >
                        Create Course
                    </NavItem>
                    <NavItem
                        isActive={entityName === "test"}
                        onClick={() => handleClick("test")}
                    >
                        Create Test
                    </NavItem>
                    <DevInfo />
                </ul>
            </nav>
            <div className="flex flex-col gap-2 items-center justify-start bg-button-background w-full mx-20 min-h-150 rounded-sm p-2">
                <span className="flex items-center justify-center bg-black/20 rounded-sm max-w-50 p-2">
                    Admin Site: {entityName}
                </span>
                <Outlet />
            </div>
        </div>
    );
}
