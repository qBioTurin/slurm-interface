import { UseFormReturnType } from '@mantine/form';
import { Card, Table } from '@mantine/core';
import styles from './SubmitJobSteps.module.css';  

type Props = {
  form: UseFormReturnType<any>;
};

export default function StepConfirmation({ form }: Props) {
  const { getValues } = form;

  const values = getValues();

  const fieldsToDisplay = [
    { key: 'Job Name', value: values.name },
    // { key: 'Description', value: values.description || 'N/A' }, // Uncomment if needed
    { key: 'Script', value: values.script },
    { key: 'Working Directory', value: values.current_working_directory },
    { key: 'Number of Nodes', value: values.nodes },
    // { key: 'Partition', value: values.partition || 'N/A' }, // Uncomment if needed
    { key: 'Number of Tasks', value: values.tasks },
    // { key: 'CPUs per Task', value: values.cpus_per_task }, // Uncomment if needed
    // { key: 'Memory per Task', value: values.memory_per_task }, // Uncomment if needed
  ];

  return (
      <Table className={styles.summaryTable}>
        <thead>
          <tr>
            <th>Field</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
        {fieldsToDisplay.map((field, index) => (
          <tr className={styles.summaryRow} key={index}>
            <td className={styles.summaryKey}>{field.key}</td>
            <td className={styles.summaryValue}>{field.value || 'N/A'}</td>
          </tr>
        ))}
        </tbody>
      </Table>
  );
}
