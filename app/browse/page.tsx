'use client';
import React, { useEffect, useState } from 'react';

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

type Movie = {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
};

export default function Browse() {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    async function fetchMovies() {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
        );
        const json = await response.json();
        console.log(json);
        setMovies(json.results);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    }
    fetchMovies();
  }, []);

  return (
    <>
      {movies.map((movie) => (
        <div key={movie.id}>
          <h4>{movie.title}</h4>
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
          />
          <p>{movie.overview}</p>
        </div>
      ))}
    </>
  );
}
