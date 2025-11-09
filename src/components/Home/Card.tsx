type CardProps = {
    title: string;
    description: string;
    image: string;
};

export default function Card({ title, description, image }: CardProps) {
    return (
        <li className="flex flex-col">
            <img src={image} alt="" className="mb-4 w-[301px] h-[169px]" />
            <div className="flex flex-col gap-2">
                <span className="font-medium text-sm">{title}</span>
                <span className="text-card font-normal text-sm max-w-[301px]">
                    {description}
                </span>
            </div>
        </li>
    );
}
