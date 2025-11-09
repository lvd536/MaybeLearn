import { HomeCard } from "../../../assets/";
import Card from "../Card";
export default function Tests() {
    return (
        <div>
            <h1 className="font-bold text-2xl mb-12">Trending Tests</h1>
            <ul className="flex gap-5">
                <Card
                    title="Algorithm Practice"
                    description="Solve coding problems and improve your algorithmic thinking"
                    image={HomeCard}
                />
                <Card
                    title="Algorithm Practice"
                    description="Solve coding problems and improve your algorithmic thinking"
                    image={HomeCard}
                />
                <Card
                    title="Algorithm Practice"
                    description="Solve coding problems and improve your algorithmic thinking"
                    image={HomeCard}
                />
            </ul>
        </div>
    );
}
