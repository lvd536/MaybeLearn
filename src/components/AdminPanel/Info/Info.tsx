import { useEffect, useState } from "react";
import type { IAdminInfo } from "../../../types";
import { getAdminInfo } from "../../../utils/admin";

export default function Info() {
    const [adminInfo, setAdminInfo] = useState<IAdminInfo>();
    useEffect(() => {
        getAdminInfo().then((res) => {
            setAdminInfo(res);
        });
    }, []);
    return (
        <div className="flex flex-col items-center bg-black/20 w-full h-full p-2 rounded-sm">
            <span className="bg-black/25 rounded-sm py-2 px-5">Stats</span>
            <div className="flex flex-col gap-2 items-center w-full h-full bg-black/25 rounded-sm p-5 mt-5">
                <span className="bg-black/20 p-2 rounded-sm w-50">
                    Current courses: {adminInfo?.courses}
                </span>
                <span className="bg-black/20 p-2 rounded-sm w-50">
                    Current tests: {adminInfo?.tests}
                </span>
                <span className="bg-black/20 p-2 rounded-sm w-50">
                    Current users: {adminInfo?.users}
                </span>
            </div>
        </div>
    );
}
