import Courses from "../../components/Home/Sections/Courses";
import Main from "../../components/Home/Sections/Main";
import Tests from "../../components/Home/Sections/Tests";

export default function HomePage() {
    return (
        <section className="flex flex-col gap-20">
            <Main />
            <Courses />
            <Tests />
        </section>
    );
}
