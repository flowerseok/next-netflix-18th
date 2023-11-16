/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import SearchBar from '@/components/search/SearchBar';
import SearchResultList from '@/components/search/SearchResultList';
import { useDebounce } from '@/hooks/useDebounce';
import { TContent } from '@/types';
import { getMovies, getSearchedMovies } from '@/utils/Api';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

const SearchPage = () => {
  const [movies, setMovies] = useState<TContent[]>([]);
  const [keyword, setKeyword] = useState<string>('');
  const [init, setInit] = useState<boolean>(true);
  const [ref, inview] = useInView();
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalPageNum, setTotalPageNum] = useState<number>(1);

  useEffect(() => {
    if (!keyword) {
      (async () => {
        // next의 fetch는 같은 요청에 대해 caching을 진행하므로,
        // 첫 요청 이후에는 caching된 데이터를 가져올 것(?)
        const defaultMovies = await getMovies('popular');
        setMovies(defaultMovies);
        setPageNum(1);
        setTotalPageNum(1);
        setInit(false);
      })();
    }
  }, [keyword]);

  useEffect(() => {
    if (pageNum > 1) {
      (async () => {
        const data = await getSearchedMovies(keyword, pageNum);
        setMovies([...movies, ...data.results]);
      })();
    }
  }, [pageNum]);

  useEffect(() => {
    if (inview && pageNum < totalPageNum) {
      setPageNum(pageNum + 1);
    }
  }, [inview]);

  const handleOnChangeQuery = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const query = e.target.value.trim();
    if (query) {
      const data = await getSearchedMovies(query);
      setMovies(data.results);
      setPageNum(data.page);
      setTotalPageNum(data.total_pages);
    }
    setKeyword(query);
    if (!query) setInit(true);
  };

  return (
    <div>
      <SearchBar
        keyword={keyword}
        setKeyword={setKeyword}
        setInit={setInit}
        handleOnChangeQuery={useDebounce(handleOnChangeQuery, 500)}
      />
      <h2 className="text-white text-[27px] ml-2.5 mt-5 mb-4 font-bold">
        {keyword.length === 0 ? 'Polular' : 'Top Searches'}
      </h2>
      {movies.length || init ? (
        <SearchResultList movies={movies} />
      ) : (
        <div className="text-white text-center mt-20 px-3 break-words">{`There are no movies that matched "${keyword}".
        `}</div>
      )}
      <div className="" ref={ref}></div>
    </div>
  );
};

export default SearchPage;
