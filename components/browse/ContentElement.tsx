import { TContent } from '@/types';
import Image from 'next/image';
import Link from 'next/link';

interface ContentElementProps {
  content: TContent;
  rank: number | undefined;
  sequence: 'head' | 'tail' | 'mid';
  isPreview?: boolean;
}

const ContentElement = ({
  content,
  rank,
  sequence,
  isPreview = false,
}: ContentElementProps) => {
  const width = 103;
  const height = 161;
  const url = 'https://image.tmdb.org/t/p/w154';
  let clickUrl = `/movies/${content.id}`;
  if (rank) clickUrl += `&rank=${rank}`;

  const imageClasses = `object-cover ${isPreview ? 'rounded-full' : ''}`;
  const widthClass = 'min-w-[103px]';
  const heightClass = isPreview ? 'h-[103px]' : 'h-[161px]';

  return (
    <Link
      href={clickUrl}
      className={`${widthClass} ${heightClass} flex ${
        sequence === 'head' ? 'ml-3' : ''
      } ${sequence === 'tail' ? 'mr-3' : 'mr-2'}`}
    >
      <Image
        src={url + content.poster_path}
        alt={content.title}
        className={imageClasses}
        width={width}
        height={isPreview ? width : height}
      />
    </Link>
  );
};

export default ContentElement;
