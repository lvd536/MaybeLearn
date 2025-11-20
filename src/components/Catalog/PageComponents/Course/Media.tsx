import type { IMedia } from "../../../../types";

interface IMediaProps {
    media: IMedia | null;
}

export default function Media({ media }: IMediaProps) {
    return (
        <>
            {media && media.type === "video" ? (
                <iframe
                    width="50%"
                    height="350"
                    src={`https://www.youtube.com/embed/${media.url}`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                    className="mt-5 rounded-xl ring-1 ring-indigo-500"
                />
            ) : media && media.type === "photo" ? (
                <img
                    src={media.url}
                    className="mt-5 rounded-xl ring-1 ring-indigo-500"
                    alt=""
                    width="30%"
                />
            ) : (
                ""
            )}
        </>
    );
}
