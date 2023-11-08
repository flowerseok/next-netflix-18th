import React from 'react';

type Movie = {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
};

async function getMovies(type: string) {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${type}?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US`
  );
  return res.json();
}

export default async function Page() {
  const popularMovies = await getMovies('popular');
  const movies = popularMovies.results;
  return (
    <>
      {movies.map((movie: Movie) => (
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
