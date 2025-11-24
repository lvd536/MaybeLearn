import { TextInput } from "../..";

interface ITextInputsProps {
    display_name: string;
    avatar_url: string;
    bio: string;
    handleChange: (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => void;
}

export default function TextInputs({
    display_name,
    avatar_url,
    bio,
    handleChange,
}: ITextInputsProps) {
    return (
        <>
            <TextInput
                placeholder="Name"
                value={display_name}
                required={true}
                name="display_name"
                onChange={(e) => handleChange(e)}
                id="nameInput"
            />
            <TextInput
                placeholder="Avatar"
                value={avatar_url}
                name="avatar_url"
                onChange={(e) => handleChange(e)}
                id="avatarInput"
            />
            <TextInput
                placeholder="Bio"
                value={bio}
                name="bio"
                onChange={(e) => handleChange(e)}
                id="bioInput"
            />
        </>
    );
}
