import styles from '../styles/Footer.module.css';

export default function Footer() {
    return (
        <div className={styles.footer}>
            <div className={styles.content}>
                <p className={styles.text}>Made with ❤️ by 김영완</p>
                <p className={styles.text}>© {new Date().getFullYear()} All rights reserved</p>
            </div>
        </div>
    );
};
