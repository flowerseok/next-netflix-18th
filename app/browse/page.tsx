import { getMovies } from '@/utils/Api';

async function Page() {
  const movies = await getMovies('popular');
  console.log(movies);
  return movies;
}

const Browse = () => {
  const Content=Page();
  return (
    <div className="bg-black w-full h-full">
      <div></div>
    </div>
  );
};

export default Browse;