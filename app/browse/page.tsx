import React from 'react';
import ContentsSlider from '@/components/browse/ContentsSlider';
import HomeNavBar from '@/components/browse/HomeNavBar';
import HomeTop from '@/components/browse/HomeTop';
import { TContent } from '@/types';
import { getMovies } from '@/utils/Api';

interface BrowseProps {
  searchParams: { [key: string]: string | undefined };
}

const Browse = async ({ searchParams }: BrowseProps) => {
  const Top = await getMovies('top_rated');
  const Popular = await getMovies('popular');
  const Upcoming = await getMovies('upcoming');
  const Nowplaying = await getMovies('now_playing');

  const defaultData = {
    rank: 1,
    category: 'Top Rate',
    posterPath: Top[0].poster_path,
  };

  return (
    <div className="bg-black w-full min-h-full pb-12 relative">
      <HomeNavBar />
      <HomeTop
        posterPath={searchParams.posterPath || defaultData.posterPath}
        rank={
          searchParams.rank
            ? Number(searchParams.rank)
            : searchParams.posterPath
            ? null
            : defaultData.rank
        }
        category={searchParams.category || defaultData.category}
      />
      <ContentsSlider
        title="Preview"
        isRanking={false}
        isPreview={true}
        contents={Nowplaying}
      />
      <ContentsSlider title="Nigeria Today" isRanking={true} contents={Top} />
      <ContentsSlider title="Popular" isRanking={false} contents={Popular} />
      <ContentsSlider title="Upcoming" isRanking={false} contents={Upcoming} />
    </div>
  );
};

export default Browse;
