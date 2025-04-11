import { useCallback, useEffect, useState } from 'react';
import { Header } from 'src/components/Header';

const Home = () => {
  const [posts, setPosts] = useState([]);

  const fetchPosts = useCallback(async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    const json = await response.json();
    setPosts(json);
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);
  return (
    <>
      <Header />
      {posts.length > 0 ? (
        <ol>
          {posts.map((post) => {
            return <li key={post.id}>{post.title}</li>;
          })}
        </ol>
      ) : null}
    </>
  );
};

export default Home;
