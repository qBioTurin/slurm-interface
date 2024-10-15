import styles from './JobDetailsComponents.module.css';

interface InfoCardProps {
  title: string;
  children: React.ReactNode;
}

export const InfoCard = ({ title, children }: InfoCardProps) => {
  return (
    <div className={styles.card}>
      <div className={styles.section}>
        <h3 className={styles.sectionHeader}>{title}</h3>
        {children}
      </div>
    </div>
  )
};
