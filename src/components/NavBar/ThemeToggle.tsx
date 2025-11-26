import { switchTheme, useTheme } from "../../stores/useThemeStore";
import { useEffect } from "react";

export default function ThemeToggle() {
    const theme = useTheme();
    const handleClick = () => switchTheme();

    useEffect(() => {
        document.documentElement.classList.remove("light", "dark");
        document.documentElement.classList.add(theme);
    }, [theme]);

    return (
        <>
            <div
                className="flex bg-catalog-card dark:bg-theme-toggle-dark relative items-center shadow-(--box-shadow-custom-1) justify-between rounded-full w-19.5 h-9.5 hover:ring-1 ring-indigo-500 transition-borders duration-500"
                onClick={() => handleClick()}
            >
                <button className="w-9.5 h-9.5 flex items-center justify-center relative rounded-full z-1">
                    <svg
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                    >
                        <path
                            d="M14.06 12.991a5.487 5.487 0 0 1-4.174-1.611A5.487 5.487 0 0 1 8.27 7.475c0-.841.187-1.652.537-2.386a5.46 5.46 0 0 1 .562-.922c-.385.04-.754.121-1.114.233a5.855 5.855 0 0 0-4.088 5.582 5.85 5.85 0 0 0 10.957 2.852 5.204 5.204 0 0 1-1.064.157Z"
                            fill="#000"
                            className="transition-all duration-400"
                        ></path>
                    </svg>
                </button>
                <button className="w-9.5 h-9.5 flex items-center justify-center relative rounded-full z-1">
                    <svg
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                    >
                        <path
                            d="M9.994 2.502a.463.463 0 0 0-.059.015.468.468 0 0 0-.365.468V4.39a.468.468 0 1 0 .936 0V2.985a.468.468 0 0 0-.512-.483ZM5.019 4.565a.469.469 0 0 0-.278.805l.98.995a.476.476 0 0 0 .674-.673l-.995-.98a.468.468 0 0 0-.381-.147Zm9.935 0a.469.469 0 0 0-.278.147l-.995.98a.476.476 0 0 0 .673.674l.98-.995a.468.468 0 0 0-.336-.805h-.044Zm-4.916 1.697a3.757 3.757 0 0 0-3.746 3.746 3.757 3.757 0 0 0 3.746 3.746 3.757 3.757 0 0 0 3.746-3.746 3.757 3.757 0 0 0-3.746-3.746ZM2.926 9.54a.47.47 0 1 0 .088.937H4.42a.468.468 0 1 0 0-.937H2.926Zm12.643 0a.47.47 0 1 0 .087.937h1.405a.468.468 0 1 0 0-.937H15.57Zm-1.595 3.966a.469.469 0 0 0-.059.014.468.468 0 0 0-.234.805l.995.98a.468.468 0 1 0 .658-.658l-.98-.995a.468.468 0 0 0-.38-.146Zm-7.975.014a.468.468 0 0 0-.278.132l-.98.995a.468.468 0 1 0 .658.658l.995-.98A.469.469 0 0 0 6 13.52Zm3.995 1.624a.466.466 0 0 0-.059.015.468.468 0 0 0-.366.468v1.405a.468.468 0 1 0 .937 0v-1.405a.468.468 0 0 0-.512-.483Z"
                            fill={theme === "dark" ? "#fff" : "#000"}
                            className="transition-all duration-400"
                        ></path>
                    </svg>
                </button>
                <div
                    className={`flex absolute bg-indigo-300/70 dark:bg-indigo-400/70 w-9.5 h-9.5 rounded-full z-0 transition-all duration-400 ${
                        theme === "dark" ? "left-0" : "left-1/2"
                    }`}
                ></div>
            </div>
        </>
    );
}
