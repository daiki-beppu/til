/* eslint-disable react/prop-types */
import Footer from 'src/components/Footer';
import Header from 'src/components/Header';
import Main from 'src/components/Main';
import styles from 'src/components/Main/Main.module.css';

export default function Home(props) {
  const {
    doubleCount,
    isView,
    handleClick,
    handleView,
    text,
    array,
    handleChange,
    handleAdd,
  } = props;
  return (
    <>
      <Header />
      <main className={styles.main}>
        {isView ? <h1>{doubleCount}</h1> : null}
        <button onClick={handleView}>{isView ? '非表示' : '表示'}</button>
        <button onClick={handleClick}>カウントアップ</button>

        <input type="text" value={text} onChange={handleChange} />
        <button onClick={handleAdd}>追加</button>
        <ul>
          {array.map((item) => {
            return <li key={item}>{item}</li>;
          })}
        </ul>
        <Main title="index" />
      </main>
      <Footer />
    </>
  );
}
