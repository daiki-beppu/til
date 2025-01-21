import { usePost } from 'src/hooks/usePots';

export const Post = () => {
  const { post, user, error, isLoading } = usePost();

  if (isLoading) {
    return <div>ローディング中</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <div>
      <div>
        <h1>{post?.title}</h1>
        <p>{post?.body}</p>
      </div>
      {user?.name ? <div>created by {user.name}</div> : null}
    </div>
  );
};
