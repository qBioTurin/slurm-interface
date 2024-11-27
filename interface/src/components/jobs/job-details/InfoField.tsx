import styles from './JobDetailsComponents.module.css';

interface InfoFieldProps {
  label: string;
  value: string | number | null | undefined;
}

export const InfoField = ({ label, value }: InfoFieldProps) => {
  return (
    <div className={styles.field}>
      <div className={styles.label}>{label}:</div>
      <div className={styles.value}>{value || 'N/A'}</div>
    </div>
  );
};

export default InfoField;