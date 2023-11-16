'use client';

import ContentElement from '@/components/browse/ContentElement';
import { LeftIcon, RightIcon } from '@/public/images';
import { TContent } from '@/types';
import { useRef, useState } from 'react';

interface ContentsSliderProps {
  title: string;
  contents: TContent[];
  isRanking: boolean;
  isPreview?: boolean;
}

const ContentsSlider = ({
  title,
  isRanking,
  contents,
  isPreview = false,
}: ContentsSliderProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMouseOnSlider, setIsMouseOnSlider] = useState<Boolean>(false);

  const handleClickMoveButton = (direction: 'prev' | 'next') => {
    if (!containerRef.current) return;
    if (direction === 'prev') {
      containerRef.current.scrollTo({
        left:
          containerRef.current.scrollLeft - containerRef.current.offsetWidth,
        behavior: 'smooth',
      });
    } else {
      containerRef.current.scrollTo({
        left:
          containerRef.current.scrollLeft + containerRef.current.offsetWidth,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="">
      <h3 className="text-[20.921px] font-bold ml-4 text-white">
        {isRanking ? 'Top 10 in ' + title : title}
      </h3>
      <div
        className="relative"
        onMouseOver={() => setIsMouseOnSlider(true)}
        onMouseLeave={() => setIsMouseOnSlider(false)}
      >
        {isMouseOnSlider ? (
          <>
            <button
              className="absolute left-0 h-full"
              onClick={() => handleClickMoveButton('prev')}
            >
              <LeftIcon />
            </button>
            <button
              className="absolute right-0 h-full"
              onClick={() => handleClickMoveButton('next')}
            >
              <RightIcon />
            </button>
          </>
        ) : null}
        <div
          className="flex mt-2 mb-5 overflow-auto scroll-smooth scroll scroll-hide"
          ref={containerRef}
        >
          {contents.map((content, idx) => (
            <ContentElement
              key={`${content.id}${content.title}`}
              rank={isRanking ? idx + 1 : undefined}
              content={content}
              sequence={
                idx === 0
                  ? 'head'
                  : idx === contents.length - 1
                  ? 'tail'
                  : 'mid'
              }
              isPreview={isPreview}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContentsSlider;
