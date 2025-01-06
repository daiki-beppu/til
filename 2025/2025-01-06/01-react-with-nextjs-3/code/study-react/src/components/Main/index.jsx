/* eslint-disable react/prop-types */

import Headline from 'src/components/Headline';
import Links from 'src/components/Links';
import styles from 'src/components/Main/Main.module.css';

const handleClick = (e) => {
  e.preventDefault();
  alert('イベント発火！');
};

export default function Main(props) {
  return (
    <main className={styles.main}>
      <a href="/about" onClick={handleClick}>
        イベント処理
      </a>
      <Headline title={props.title} />
      <Links />
    </main>
  );
}
