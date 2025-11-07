import Header from "../../components/Profile/Header";
import Details from "../../components/Profile/Details";
import { useState } from "react";
import Edit from "../../components/Profile/Edit";

export default function Profile() {
    const [isEditPage, setIsEditPage] = useState<boolean>(false);
    return (
        <>
            <Header onClick={() => setIsEditPage(!isEditPage)} />
            {isEditPage ? <Edit /> : <Details />}
        </>
    );
}
