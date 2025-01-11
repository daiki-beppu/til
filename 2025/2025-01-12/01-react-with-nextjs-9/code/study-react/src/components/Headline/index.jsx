/* eslint-disable react/prop-types */
import Image from 'next/image';
import styles from 'src/components/Headline/Headline.module.css';

export default function Headline(props) {
  console.log(props);
  return (
    <div className={styles.main}>
      <h1>{props.title} Page</h1>
      <Image
        className={styles.logo}
        src="/next.svg"
        alt="Next.js logo"
        width={180}
        height={38}
        priority
      />
      <ol>
        <li>
          Get started by editing <code>{props.title}.js</code>.
        </li>
        <li>Save and see your changes instantly.</li>
      </ol>
      <button onClick={props.handleReduce}>削除</button>
    </div>
  );
}
