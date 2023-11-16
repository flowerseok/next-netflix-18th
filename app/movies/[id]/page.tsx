import React from 'react';
import DetailTop from '@/components/detail/DetailTop';
import DetailOverview from '@/components/detail/DetailOverview';
import { getMovieDetails } from '@/utils/Api';
import { TContent } from '@/types';

interface DetailPageProps {
  params: { id: string };
}
const Page = async ({ params }: DetailPageProps) => {
  const movie: TContent = await getMovieDetails(params.id);

  return (
    <div className="min-h-screen bg-black">
      <DetailTop posterPath={movie.poster_path} />
      <DetailOverview title={movie.title} overview={movie.overview} />
    </div>
  );
};

export default Page;
