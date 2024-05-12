import styles from "./page.module.css";
import LoginForm from '../components/LoginForm/LoginForm';

export default function Home() {
  return (
    <main className={styles.main}>
      <LoginForm />
    </main>
  );
};
