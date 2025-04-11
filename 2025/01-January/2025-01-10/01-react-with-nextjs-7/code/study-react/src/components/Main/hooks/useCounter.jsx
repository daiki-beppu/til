import { useCallback, useState } from 'react';

export const useCounter = () => {
  const [count, setCount] = useState(1);
  const [isView, setIsView] = useState(true);

  const handleClick = useCallback(() => {
    if (count < 5) {
      setCount((prevCount) => prevCount + 1);
    }
  }, [count]);

  const handleView = useCallback(() => {
    setIsView((prevIsView) => !prevIsView);
  }, []);

  return { count, isView, handleClick, handleView };
};
