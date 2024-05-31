'use client'
import { useEffect, useState } from 'react'
import Card from '../components/CharCard'
import NavBar from '../components/NavBar'

type character = {
  id: number
  name: string
  status: string
  species: string
  type: string
  gender: string
  origin: {
    name: string
    url: string
  }
  location: {
    name: string
    url: string
  }
  image: string
  episode: []
  url: string
  created: string
}

export default function Favorites() {
  const [characters, setCharacters] = useState<character[]>([])

  const fetchData = async () => {
    try {
      const favoritesFromStorage = localStorage.getItem('favorites')
      const favoritesArray = favoritesFromStorage
        ? JSON.parse(favoritesFromStorage)
        : []

      const favoriteCharacters: character[] = []

      for (const id of favoritesArray) {
        const response = await fetch(
          `https://rickandmortyapi.com/api/character/${id}`,
        )
        if (!response.ok) {
          continue
        }
        const characterData: character = await response.json()
        favoriteCharacters.push(characterData)
      }

      setCharacters(favoriteCharacters)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <>
      <NavBar></NavBar>
      <div className='m-8'>
        <div className='grid grid-cols-1 place-items-center gap-7 md:grid-cols-3'>
          {characters.map((character, index) => (
            <Card
              key={index}
              id={character.id}
              imgUrl={character.image}
              name={character.name}
              status={character.status}
              species={character.species}
              gender={character.gender}
              location={character.location?.name ?? 'Unknown'}
            />
          ))}
        </div>
      </div>
    </>
  )
}
