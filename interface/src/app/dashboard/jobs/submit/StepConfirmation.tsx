import { UseFormReturn } from 'react-hook-form';
import { Card, Table } from '@mantine/core';
import styles from './SubmitJobSteps.module.css';  

type Props = {
  form: UseFormReturn<any>;
};

export default function StepConfirmation({ form }: Props) {
  const { getValues } = form;

  // Fetch all form values
  const values = getValues();

  return (
      <Table className={styles.summaryTable}>
        <thead>
          <tr>
            <th>Field</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr className={styles.summaryRow}>
            <td className={styles.summaryKey}>Job Name</td>
            <td className={styles.summaryValue}>{values.name}</td>
          </tr>
          {/* <tr className={styles.summaryRow}>
            <td className={styles.summaryKey}>Description</td>
            <td className={styles.summaryValue}>{values.description || 'N/A'}</td>
          </tr> */}
          <tr className={styles.summaryRow}>
            <td className={styles.summaryKey}>Script</td>
            <td className={styles.summaryValue}>{values.script}</td>
          </tr>
          <tr className={styles.summaryRow}>
            <td className={styles.summaryKey}>Working Directory</td>
            <td className={styles.summaryValue}>{values.current_working_directory}</td>
          </tr>
          <tr className={styles.summaryRow}>
            <td className={styles.summaryKey}>Number of Nodes</td>
            <td className={styles.summaryValue}>{values.nodes}</td>
          </tr>
          {/* <tr className={styles.summaryRow}>
            <td className={styles.summaryKey}>Partition</td>
            <td className={styles.summaryValue}>{values.partition || 'N/A'}</td>
          </tr> */}
          <tr className={styles.summaryRow}>
            <td className={styles.summaryKey}>Number of Tasks</td>
            <td className={styles.summaryValue}>{values.tasks}</td>
          </tr>
          {/* <tr className={styles.summaryRow}>
            <td className={styles.summaryKey}>CPUs per Task</td>
            <td className={styles.summaryValue}>{values.cpus_per_task}</td> 
          </tr>
          <tr className={styles.summaryRow}>
            <td className={styles.summaryKey}>Memory per Task</td>
            <td className={styles.summaryValue}>{values.memory_per_task}</td>
          </tr> */}
        </tbody>
      </Table>
  );
}
