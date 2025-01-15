import { useCallback, useMemo, useState } from 'react';

export const useCounter = () => {
  const [count, setCount] = useState(1);
  const [isView, setIsView] = useState(true);

  const doubleCount = useMemo(() => {
    return count * 2;
  }, [count]);

  const handleClick = useCallback(() => {
    if (count < 5) {
      setCount((prevCount) => prevCount + 1);
    }
  }, [count]);

  const handleView = useCallback(() => {
    setIsView((prevIsView) => !prevIsView);
  }, []);

  return { count, doubleCount, isView, handleClick, handleView };
};
