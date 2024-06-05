"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, useCallback, Suspense } from "react";
import NavBar from "../components/NavBar";
import Image from "next/image";

function CharacterProfilePage() {
  const idParams = useSearchParams();
  const characterId = idParams ? idParams.get("id") : null;
  const [character, setCharacter] = useState({
    id: 0,
    name: "",
    status: "",
    species: "",
    type: "",
    gender: "",
    origin: {
      name: "",
      url: "",
    },
    location: {
      name: "",
      url: "",
    },
    image: "",
    episode: [],
    url: "",
    created: "",
  });
  const [firstEpisode, setFirstEpisode] = useState("");

  const fetchCharacter = useCallback(async () => {
    if (!characterId) return;

    try {
      const response = await fetch(
        `https://rickandmortyapi.com/api/character/${characterId}`,
      );
      if (!response.ok) {
        throw new Error("Failed to fetch character");
      }
      const data = await response.json();
      setCharacter(data);
    } catch (error) {
      console.error("Error fetching character:", error);
    }
  }, [characterId]);

  const fetchFirstEpisode = useCallback(async () => {
    if (character.episode.length === 0) return;

    try {
      const response = await fetch(`${character.episode[0]}`);
      if (!response.ok) {
        throw new Error("Failed to fetch first episode");
      }
      const data = await response.json();
      setFirstEpisode(data.name);
    } catch (error) {
      console.error("Error fetching character:", error);
    }
  }, [character]);

  useEffect(() => {
    fetchCharacter();
  }, [fetchCharacter]);

  useEffect(() => {
    if (character.episode.length > 0) {
      fetchFirstEpisode();
    }
  }, [character, fetchFirstEpisode]);

  return (
    <>
      <NavBar />
      <div className="relative mx-auto mb-5 mt-1 w-full min-w-0 max-w-md break-words bg-cyan-500 shadow-lg md:max-w-2xl">
        <div className="flex flex-row items-start p-10">
          <Image
            src={character.image}
            className="h-50 w-50"
            alt={`Imagen de ${character.name}`}
            width={200}
            height={200}
          />
          <div className="ml-4">
            <h3 className="text-4xl font-bold">{character.name}</h3>
            <p className="text-white">{character.origin.name}</p>
          </div>
        </div>
        <div className="mt-4 w-full p-4">
          <div className="my-1 bg-sky-500 p-1 text-white">
            <p>
              <strong>Gender:</strong> {character.gender}
            </p>
          </div>
          <div className="my-1 bg-sky-500 p-1 text-white">
            <p>
              <strong>Status:</strong> {character.status}
            </p>
          </div>
          <div className="my-1 bg-sky-500 p-1 text-white">
            <p>
              <strong>Species:</strong> {character.species}
            </p>
          </div>
          <div className="my-1 bg-sky-500 p-1 text-white">
            <p>
              <strong>First episode:</strong> {firstEpisode}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

function WrappedCharacterProfilePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CharacterProfilePage />
    </Suspense>
  );
}

export default WrappedCharacterProfilePage;
