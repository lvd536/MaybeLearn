import { useEffect, useState } from "react";
import {
    CourseCreation,
    DevInfo,
    Info,
    NavItem,
    TestCreation,
} from "../../components/AdminPanel";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../stores/useAuthStore";
import { getCourseId } from "../../stores/Catalog/Creation/useCourseCreationStore";
import { getTestId } from "../../stores/Catalog/Creation/useTestCreationStore";

type Pages = "info" | "course" | "test";

export default function AdminPanel() {
    const [currentPage, setCurrentPage] = useState<Pages>("info");
    const profile = useAuthStore((state) => state.profile);
    const courseId = getCourseId();
    const testId = getTestId();
    const navigate = useNavigate();
    const handleClick = (page: Pages) => {
        setCurrentPage(page);
    };
    if (profile?.role !== "admin" || !profile) navigate("profile");
    useEffect(() => {
        if (courseId !== null) setCurrentPage("course");
        else if (testId !== null) setCurrentPage("test");
        else setCurrentPage("info");
    }, []);
    return (
        <div className="flex">
            <nav>
                <ul className="flex flex-col gap-5">
                    <NavItem
                        isActive={currentPage === "info"}
                        onClick={() => handleClick("info")}
                    >
                        Info
                    </NavItem>
                    <NavItem
                        isActive={currentPage === "course"}
                        onClick={() => handleClick("course")}
                    >
                        Create Course
                    </NavItem>
                    <NavItem
                        isActive={currentPage === "test"}
                        onClick={() => handleClick("test")}
                    >
                        Create Test
                    </NavItem>
                    <DevInfo />
                </ul>
            </nav>
            <div className="flex flex-col gap-2 items-center justify-start bg-button-background w-full mx-20 min-h-150 rounded-sm p-2">
                <span className="flex items-center justify-center bg-black/20 rounded-sm max-w-50 p-2">
                    Admin Site: {currentPage}
                </span>
                {currentPage === "info" && <Info />}
                {currentPage === "course" && <CourseCreation />}
                {currentPage === "test" && <TestCreation />}
            </div>
        </div>
    );
}
