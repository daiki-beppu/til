/* eslint-disable react/prop-types */

import { useCallback, useState } from 'react';
import Headline from 'src/components/Headline';
import Links from 'src/components/Links';
import styles from 'src/components/Main/Main.module.css';

const ITEMS = [
  {
    style: 'primary',
    href: 'https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app',
    description: 'Deploy now',
  },
  {
    style: 'secondary',
    href: 'https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app',
    description: 'Read our docs',
  },
];

export default function Main(props) {
  const [items, setItems] = useState(ITEMS);
  const handleReduce = useCallback(() => {
    setItems((prevItems) => {
      return prevItems.slice(0, prevItems.length - 1);
    });
  }, []);
  return (
    <div className={styles.main}>
      <Headline title={props.title} handleReduce={handleReduce} />
      <Links items={items} handleReduce={handleReduce} />
      <button onClick={handleReduce}>削除</button>
    </div>
  );
}
