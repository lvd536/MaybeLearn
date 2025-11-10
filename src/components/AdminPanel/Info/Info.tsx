export default function Info() {
    return (
        <div className="flex flex-col items-center bg-black/20 w-full h-full p-2 rounded-sm">
            <span className="bg-black/25 rounded-sm py-2 px-5">Stats</span>
            <div className="flex flex-col gap-2 items-center w-full h-full bg-black/25 rounded-sm p-5 mt-5">
                <span className="bg-black/20 p-2 rounded-sm w-50">
                    Current courses: 322
                </span>
                <span className="bg-black/20 p-2 rounded-sm w-50">
                    Current tests: 322
                </span>
                <span className="bg-black/20 p-2 rounded-sm w-50">
                    Current users: 322
                </span>
            </div>
        </div>
    );
}
