import Link from 'next/link';
import { Button } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import styles from './FloatingButton.module.css';

const FloatingButton = () => {
    return (
        <Link href="/dashboard/nodes-reservation">
            <Button  className={styles.floatingButton} aria-label="Reserve Node">
                <IconPlus size={20} />
            </Button>
        </Link>
    );
};

export default FloatingButton;
