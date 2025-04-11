/* eslint-disable react/prop-types */
import Headline from '@/components/Headline';
import Links from '@/components/Links';
import styles from '@/styles/Home.module.css';

export default function Main(props) {
  return (
    <main className={styles.main}>
      <Headline title={props.title} />
      <Links />
    </main>
  );
}
