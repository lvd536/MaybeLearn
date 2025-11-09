import { Header, Details, Edit } from "../../components/Profile/";
import { useState } from "react";

export default function Profile() {
    const [isEditPage, setIsEditPage] = useState<boolean>(false);
    return (
        <>
            <Header onClick={() => setIsEditPage(!isEditPage)} />
            {isEditPage ? <Edit /> : <Details />}
        </>
    );
}
