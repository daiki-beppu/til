/* eslint-disable react/prop-types */

import Headline from 'src/components/Headline';
import Links from 'src/components/Links';
import styles from 'src/components/Main/Main.module.css';
import { useCounter } from 'src/components/Main/hooks/useCounter';
import { useInput } from 'src/components/Main/hooks/useInput';
import { useSetBgColor } from 'src/components/Main/hooks/useSetBgColor';

export default function Main(props) {
  const { count, isView, handleClick, handleView } = useCounter();
  const { text, array, handleChange, handleAdd } = useInput();
  useSetBgColor();

  return (
    <main className={styles.main}>
      {isView ? <h1>{count}</h1> : null}
      <button onClick={handleView}>{isView ? '非表示' : '表示'}</button>
      <button onClick={handleClick}>イベント処理</button>

      <input type="text" value={text} onChange={handleChange} />
      <button onClick={handleAdd}>追加</button>
      <ul>
        {array.map((item) => {
          return <li key={item}>{item}</li>;
        })}
      </ul>
      <Headline title={props.title} />
      <Links />
    </main>
  );
}
