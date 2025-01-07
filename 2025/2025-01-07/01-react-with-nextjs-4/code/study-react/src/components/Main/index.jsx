/* eslint-disable react/prop-types */

import { useEffect, useState } from 'react';
import Headline from 'src/components/Headline';
import Links from 'src/components/Links';
import styles from 'src/components/Main/Main.module.css';

export default function Main(props) {
  const [count, setCount] = useState(1);

  // let count = 1;
  const handleClick = () => {
    setCount((count) => count + 1);
    // count = count + 1;
  };
  useEffect(() => {
    // マウント時の処理
    document.body.style.backgroundColor = 'skyblue';

    // return 以降がアンマウント時の処理
    return () => {
      document.body.style.backgroundColor = '';
    };
  }, []);

  return (
    <main className={styles.main}>
      <h1>{count}</h1>
      <button onClick={handleClick}>イベント処理</button>
      <Headline title={props.title} />
      <Links />
    </main>
  );
}
