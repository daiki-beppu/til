import { useCallback, useEffect, useReducer } from 'react';

const initialState = {
  posts: [],
  loading: true,
  error: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'end':
      return {
        ...state,
        posts: action.posts,
        loading: false,
      };

    case 'error':
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    default:
      throw new Error('no such action type');
  }
};

const Posts = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const fetchPosts = useCallback(async () => {
    try {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/posts'
      );

      if (!response.ok) {
        throw new Error('エラーが発生しました');
      }

      const json = await response.json();
      dispatch({ type: 'end', posts: json });
    } catch (error) {
      dispatch({ type: 'error', error });
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  if (state.loading) {
    return <div>ローディング中</div>;
  }

  if (state.error) {
    return <div>{state.error.message}</div>;
  }

  if (state.posts.length === 0) {
    return <div>データは空です</div>;
  }

  return (
    <ol>
      {state.posts.map((post) => {
        return <li key={post.id}>{post.title}</li>;
      })}
    </ol>
  );
};

export default Posts;
