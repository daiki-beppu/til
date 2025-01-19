import useSWR from 'swr';

const fetcher = async (url) => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('エラーが発生しました');
  }

  const json = await response.json();

  return json;
};

export const usePosts = () => {
  const { data, error } = useSWR(
    'https://jsonplaceholder.typicode.com/posts',
    fetcher
  );

  return {
    data,
    error,
    isLoading: !error && !data,
    isEmpty: data && data.length === 0,
  };
};
