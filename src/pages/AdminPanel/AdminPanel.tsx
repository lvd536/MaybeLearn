import { useState } from "react";

type Pages = "info" | "course" | "test";

export default function AdminPanel() {
    const [currentPage, setCurrentPage] = useState<Pages>("info");

    const handleClick = (page: Pages) => {
        setCurrentPage(page);
    };

    return (
        <>
            <nav>
                <ul className="absolute left-5 flex flex-col gap-5">
                    <li
                        className={`bg-button-background/80 rounded-sm p-2 w-50 transition-bg duration-300 hover:bg-button-background ${
                            currentPage === "info" && "ring-1 ring-white"
                        }`}
                        onClick={() => handleClick("info")}
                    >
                        Info
                    </li>
                    <li
                        className={`bg-button-background/80 rounded-sm p-2 w-50 transition-bg duration-300 hover:bg-button-background ${
                            currentPage === "course" && "ring-1 ring-white"
                        }`}
                        onClick={() => handleClick("course")}
                    >
                        Create Course
                    </li>
                    <li
                        className={`bg-button-background/80 rounded-sm p-2 w-50 transition-bg duration-300 hover:bg-button-background ${
                            currentPage === "test" && "ring-1 ring-white"
                        }`}
                        onClick={() => handleClick("test")}
                    >
                        Create Test
                    </li>
                    <li className="flex flex-col gap-2 items-center justify-center bg-button-background/30 p-2 rounded-sm">
                        <span className="bg-button-background/70 p-2 rounded-sm">
                            Dev info
                        </span>
                        <div className="flex flex-col gap-2 items-center justify-center bg-button-background/80 p-2 rounded-sm">
                            <span>Creator: lvd.</span>
                            <span>Build state: dev</span>
                            <span>DB: supabase</span>
                        </div>
                    </li>
                </ul>
            </nav>
        </>
    );
}
