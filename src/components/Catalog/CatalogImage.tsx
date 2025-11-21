import { CatalogCardImage } from "../../assets";

interface ICatalogImageProps {
    image: string;
}

export default function CatalogImage({ image }: ICatalogImageProps) {
    return (
        <img
            src={image || CatalogCardImage}
            alt=""
            loading="lazy"
            className="hidden sm:flex rounded-xl w-[309px] h-[165px] object-cover transition-shadow duration-300 hover:shadow-catalog-card"
        />
    );
}
