import { HomeCard } from "../../../assets/";
import { getTestsStable } from "../../../stores/Catalog/useTestsStore";
import Card from "../Card";
export default function Tests() {
    const tests = getTestsStable().slice(0, 5);
    return (
        <div>
            <h1 className="font-bold text-2xl mb-12">Trending Tests</h1>
            <ul className="flex gap-5">
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
