/* eslint-disable react/prop-types */
import { Footer } from 'src/components/Footer';
import { Main } from 'src/components/Main';
import styles from 'src/components/Main/Main.module.css';

const About = (props) => {
  return (
    <>
      <main className={styles.main}>
        {props.isView ? <h1>{props.doubleCount}</h1> : null}
        <button onClick={props.handleView}>
          {props.isView ? '非表示' : '表示'}
        </button>
        <button onClick={props.handleClick}>カウントアップ</button>

        <input type="text" value={props.text} onChange={props.handleChange} />
        <button onClick={props.handleAdd}>追加</button>
        <ul>
          {props.array.map((item) => {
            return <li key={item}>{item}</li>;
          })}
        </ul>
        <Main title="index" />
      </main>
      <Footer />
    </>
  );
};

export default About;
