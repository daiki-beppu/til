// import styles from '@/styles/Home.module.css';
import Link from 'next/link';
import styles from 'src/components/Header/Header.module.css';

export const Header = () => {
  return (
    <header className={styles.header}>
      <Link href="/">Index Page</Link>
      <Link href="/about">About Page</Link>
    </header>
  );
};
