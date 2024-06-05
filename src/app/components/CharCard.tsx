// src/app/components/CharCard.tsx
"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

interface Props {
  id: number;
  imgUrl: string;
  name: string;
}

const Card: React.FC<Props> = ({
  id,
  imgUrl,
  name,
}) => {
  const [favorite, setFavorite] = useState<boolean>(false);

  useEffect(() => {
    const favoritesFromStorage = localStorage.getItem("favorites");
    if (favoritesFromStorage) {
      const favoritesArray = JSON.parse(favoritesFromStorage);
      setFavorite(favoritesArray.includes(id));
    }
  }, [id]);

  const toggleFavorite = () => {
    setFavorite(!favorite);
    let favoritesArray: number[] = [];
    const favoritesFromStorage = localStorage.getItem("favorites");
    if (favoritesFromStorage) {
      favoritesArray = JSON.parse(favoritesFromStorage);
    }
    if (favorite) {
      favoritesArray = favoritesArray.filter((favId: number) => favId !== id);
    } else {
      favoritesArray.push(id);
    }
    localStorage.setItem("favorites", JSON.stringify(favoritesArray));
  };

  return (
    <div className="max-w-sm overflow-hidden border-sky-500 shadow-lg transition-transform duration-200">
      <div className="relative">
        <Image
          className="w-full"
          src={imgUrl}
          alt={name}
          width={300}
          height={300}
        />
        <button
          onClick={toggleFavorite}
          className={`absolute right-4 top-4 rounded-full bg-yellow-500 p-1 ${favorite ? "bg-yellow-400" : "bg-opacity-60"}`}
          aria-label="Toggle Favorite"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill={favorite ? "yellow" : "none"}
            stroke="currentColor"
            strokeWidth="2"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.049 2.927c.336-.515.994-.515 1.33 0l1.828 2.799a1.5 1.5 0 001.285.764l3.095.45c1.669.242 2.34 2.31 1.13 3.493l-2.24 2.183a1.5 1.5 0 00-.434 1.343l.528 3.078a1.5 1.5 0 01-2.173 1.582l-2.763-1.453a1.5 1.5 0 00-1.398 0l-2.763 1.453a1.5 1.5 0 01-2.173-1.582l.528-3.078a1.5 1.5 0 00-.434-1.343l-2.24-2.183c-1.21-1.183-.539-3.251 1.13-3.493l3.095-.45a1.5 1.5 0 001.285-.764l1.828-2.799z"
            />
          </svg>
        </button>
        <div className="absolute bottom-0 w-full bg-sky-500">
          <a href={`/profile?id=${id}`}>
            <h5 className="text-2xl font-bold text-black">{name}</h5>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Card;
