import styles from './Footer.module.scss';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <p className={styles.text}>
          &copy; {new Date().getFullYear()} Unsplash Clone. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
