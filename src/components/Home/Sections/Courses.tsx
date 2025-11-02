import HomeCard from "../../../assets/HomeCard.png";
import Card from "../Card";
export default function Courses() {
    return (
        <div>
            <h1 className="font-bold text-2xl mb-12">Popular Courses</h1>
            <ul className="flex gap-5">
                <Card
                    title="Unity for Beginners"
                    description="Learn the basics of Unity programming"
                    image={HomeCard}
                />
                <Card
                    title="Unity for Beginners"
                    description="Learn the basics of Unity programming"
                    image={HomeCard}
                />
                <Card
                    title="Unity for Beginners"
                    description="Learn the basics of Unity programming"
                    image={HomeCard}
                />
            </ul>
        </div>
    );
}
