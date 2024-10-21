import '@mantine/core/styles.css';
import styles from './loadingPage.module.css';
import { Loader } from '@mantine/core';

export const LoadingPage = () => {
    return (
        <div className={styles.container}>
            <Loader />
        </div>
    );
}

export default LoadingPage;

