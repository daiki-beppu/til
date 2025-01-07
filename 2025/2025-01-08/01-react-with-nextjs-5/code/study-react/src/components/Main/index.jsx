/* eslint-disable react/prop-types */

import { useCallback, useEffect, useState } from 'react';
import Headline from 'src/components/Headline';
import Links from 'src/components/Links';
import styles from 'src/components/Main/Main.module.css';

export default function Main(props) {
  const [count, setCount] = useState(1);
  const [text, setText] = useState('');
  const [isView, setIsView] = useState(true);

  const handleClick = useCallback(() => {
    if (count < 5) {
      setCount((count) => count + 1);
    }
  }, [count]);

  const handleChange = useCallback((e) => {
    if (e.target.value.length > 5) {
      alert('制限文字数を超えています、5文字以内にしてください');
    }
    setText(e.target.value.trim());
  }, []);

  const handleView = useCallback(() => {
    setIsView((isView) => !isView);
  }, []);

  useEffect(() => {
    // alert('コンポーネントがマウントされました');
    // マウント時の処理
    document.body.style.backgroundColor = 'skyblue';

    // return 以降がアンマウント時の処理
    return () => {
      document.body.style.backgroundColor = '';
    };
  }, []);

  return (
    <main className={styles.main}>
      {isView ? <h1>{count}</h1> : null}
      <button onClick={handleView}>{isView ? '非表示' : '表示'}</button>

      <button onClick={handleClick}>イベント処理</button>
      <input type="text" value={text} onChange={handleChange} />
      <Headline title={props.title} />
      <Links />
    </main>
  );
}
