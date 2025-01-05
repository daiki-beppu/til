// import styles from '@/styles/Home.module.css';
import Link from 'next/link';

export default function Header() {
  return (
    <header>
      <Link href="/">Index Page</Link>
      <Link href="/about">About Page</Link>
    </header>
  );
}
