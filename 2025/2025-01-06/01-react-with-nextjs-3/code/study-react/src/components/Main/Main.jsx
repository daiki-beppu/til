/* eslint-disable react/prop-types */

import Headline from 'src/components/Headline/Headline';
import Links from 'src/components/Links/Links';
import styles from 'src/components/Main/Main.module.css';

export default function Main(props) {
  return (
    <main className={styles.main}>
      <Headline title={props.title} />
      <Links />
    </main>
  );
}
