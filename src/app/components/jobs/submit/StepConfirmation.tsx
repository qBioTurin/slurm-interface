import { UseFormReturnType } from '@mantine/form';
import { Table } from '@mantine/core';

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
    { key: 'Node list', value: values.specify_nodes || 'N/A' },
    // { key: 'CPUs per Task', value: values.cpus_per_task }, // Uncomment if needed
    // { key: 'Memory per Task', value: values.memory_per_task }, // Uncomment if needed
  ];

  return (
    <Table mt='sm' striped highlightOnHover withColumnBorders withRowBorders={false}>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Field</Table.Th>
          <Table.Th>Value</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {fieldsToDisplay.map((field, index) => (
          <Table.Tr key={index}>
            <Table.Td >{field.key}</Table.Td>
            <Table.Td >{field.value || 'N/A'}</Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  );
}
