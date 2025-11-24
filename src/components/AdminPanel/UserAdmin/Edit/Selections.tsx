import { SelectInput } from "../..";

interface ISelectionsProps {
    role: string;
    rank: string;
    handleChange: (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => void;
}

export default function Selections({
    rank,
    role,
    handleChange,
}: ISelectionsProps) {
    return (
        <>
            <div className="flex gap-2">
                <label
                    htmlFor="currentModule"
                    className="bg-black/20 p-1 sm:p-2 rounded-sm w-15"
                >
                    Role
                </label>
                <SelectInput
                    name="role"
                    id="adminInput"
                    value={role}
                    onChange={(e) => handleChange(e)}
                >
                    <option value="user">User</option>
                    <option value="moderator">Moderator</option>
                    <option value="admin">Admin</option>
                </SelectInput>
            </div>
            <div className="flex gap-2">
                <label
                    htmlFor="currentModule"
                    className="bg-black/20 p-1 sm:p-2 rounded-sm w-15"
                >
                    Rank
                </label>
                <SelectInput
                    name="rank"
                    id="adminInput"
                    value={rank}
                    onChange={(e) => {
                        handleChange(e);
                    }}
                >
                    <option value="newbie">Newbie</option>
                    <option value="apprentice">Apprentice</option>
                    <option value="coder">Coder</option>
                    <option value="practitioner">Practitioner</option>
                    <option value="master">Master</option>
                    <option value="optimizer">Optimizer</option>
                    <option value="architect">Architect</option>
                    <option value="guru">Guru</option>
                    <option value="virtuoso">Virtuoso</option>
                    <option value="legend">Legend</option>
                </SelectInput>
            </div>
        </>
    );
}
