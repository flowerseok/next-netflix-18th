import React from 'react';
import Image from 'next/image';
import { PlayIcon } from '@/public/images';

interface DetailTopProps {
  posterPath: string | null;
}

const DetailTop = ({ posterPath }: DetailTopProps) => {
  const url = `https://image.tmdb.org/t/p/original/${posterPath}`;
  const defaultImageUrl =
    'https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg';

  return (
    <div className="flex flex-col items-center w-full mb-[43px]">
      <div className="w-full h-[415px] overflow-hidden sm:h-[700px] md:h-[1000px] relative ">
        <Image
          src={posterPath ? url : defaultImageUrl}
          width={800}
          height={1200}
          alt="top poster"
          className="absolute object-cover w-full"
        />
      </div>

      <div className="w-full flex justify-center px-[54px] mt-[11px]">
        <button className="bg-[#C4C4C4] w-[303px] h-[45px] flex justify-center items-center rounded-[5.63px] text-black">
          <PlayIcon />
          <span className="ml-[15px] text-[20px] font-semibold">Play</span>
        </button>
      </div>
    </div>
  );
};

export default DetailTop;
