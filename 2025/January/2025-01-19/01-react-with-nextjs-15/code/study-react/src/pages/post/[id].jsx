import { useRouter } from 'next/router';
import { Header } from 'src/components/Header';
import { usePosts } from 'src/hooks/usePosts';

const PostId = () => {
  const router = useRouter();
  const { data, error, isLoading, isEmpty } = usePosts();

  if (isLoading) {
    return <div>ローディング中</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  if (isEmpty) {
    return <div>データは空です</div>;
  }

  return (
    <>
      <Header />
      <div>{data[router.query.id].body}</div>
    </>
  );
};

export default PostId;
