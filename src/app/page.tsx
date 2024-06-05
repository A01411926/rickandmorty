"use client";
import Card from "./components/CharCard";
import NavBar from "./components/NavBar";
import { useEffect, useState } from "react";

type Character = {
  id: number;
  name: string;
  status: string;
  species: string;
  gender: string;
  image: string;
  url: string;
  location: {
    name: string;
    url: string;
  };
};

type Info = {
  next: string | null;
  prev: string | null;
};

export default function Home() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [info, setInfo] = useState<Info>({ next: null, prev: null });

  // Function to fetch data from the API
  const fetchData = async (url: string) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setCharacters(data.results);
      setInfo({ next: data.info.next, prev: data.info.prev });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Load initial data
  useEffect(() => {
    fetchData("https://rickandmortyapi.com/api/character");
  }, []);

  // Handlers for the pagination buttons
  const handlePrevPage = () => info.prev && fetchData(info.prev);
  const handleNextPage = () => info.next && fetchData(info.next);

  return (
    <>
      <NavBar />
      <div className="m-8">
        <div className="grid grid-cols-1 place-items-center gap-1 md:grid-cols-5">
          {characters.map((character) => (
            <Card
              key={character.id}
              id={character.id}
              imgUrl={character.image}
              name={character.name}
              status={character.status}
              species={character.species}
              gender={character.gender}
              location={character.location.name}
            />
          ))}
        </div>
        <div className="mt-8 flex justify-between">
          <button
            onClick={handlePrevPage}
            disabled={!info.prev}
            className="hover: rounded  bg-sky-500 px-4 py-2 text-black hover:bg-cyan-500 disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={handleNextPage}
            disabled={!info.next}
            className="rounded bg-sky-500  px-4 py-2 text-black hover:bg-cyan-500 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}
