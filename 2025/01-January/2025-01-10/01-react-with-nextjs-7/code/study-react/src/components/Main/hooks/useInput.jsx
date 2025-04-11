import { useCallback, useState } from 'react';

export const useInput = () => {
  const [text, setText] = useState('');
  const [array, setArray] = useState([]);

  const handleChange = useCallback((e) => {
    if (e.target.value.length > 5) {
      alert('制限文字数を超えています、5文字以内にしてください');
    }
    setText(e.target.value.trim());
  }, []);

  const handleAdd = useCallback(() => {
    setArray((prevArray) => {
      if (prevArray.some((item) => item === text)) {
        alert('おんなじ要素がすでにあるよ！');
        return prevArray;
      }
      return [...prevArray, text];
    });
  }, [text]);
  return { text, array, handleChange, handleAdd };
};
