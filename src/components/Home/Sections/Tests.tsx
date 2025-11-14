import { HomeCard } from "../../../assets/";
import { getTestsStable } from "../../../stores/Catalog/useTestsStore";
import Card from "../Card";
export default function Tests() {
    const tests = getTestsStable().slice(0, 4);
    return (
        <div className="flex flex-col gap-6">
            <h1 className="hidden sm:inline font-bold text-2xl">
                Trending Tests
            </h1>
            <ul className="hidden sm:flex flex-wrap gap-5">
                {tests.map((t, index) => (
                    <Card
                        title={t.data.title}
                        description={t.data.description}
                        image={HomeCard}
                        key={index}
                    />
                ))}
            </ul>
        </div>
    );
}
