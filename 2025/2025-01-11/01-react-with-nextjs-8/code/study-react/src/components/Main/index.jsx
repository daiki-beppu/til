/* eslint-disable react/prop-types */

import Headline from 'src/components/Headline';
import Links from 'src/components/Links';
import styles from 'src/components/Main/Main.module.css';

export default function Main(props) {
  return (
    <div className={styles.main}>
      <Headline title={props.title} />
      <Links />
    </div>
  );
}
