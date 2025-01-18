import styles from '../styles/Header.module.css';

export default function Header() {
    return (
        <header className={styles.header}>
            <h1 className={styles.title}>Shape Editor</h1>
        </header>
    )
}