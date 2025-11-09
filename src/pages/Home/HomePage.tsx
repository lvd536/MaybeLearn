import { Courses, Tests, Main } from "../../components/Home/";

export default function HomePage() {
    return (
        <section className="flex flex-col gap-20">
            <Main />
            <Courses />
            <Tests />
        </section>
    );
}
