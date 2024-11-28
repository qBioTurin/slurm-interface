import React from 'react';
import { Card, Table, Text } from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons-react';

type ReservationSummaryProps = {
  reservation: {
    name: string;
    start_time: Date;
    end_time: Date;
    users: string;
    nodes?: string;
    partition?: string;
    node_cnt?: number;
    errors?: string[];
  };
};

export const ReservationSummary = ({ reservation }: ReservationSummaryProps) => {
  const { name, start_time, end_time, users, nodes, errors } = reservation;

  const fieldsToDisplay = [
    { key: 'Name', value: name },
    { key: 'Start Time', value: new Date(start_time).toLocaleString() },
    { key: 'End Time', value: new Date(end_time).toLocaleString() },
    { key: 'Users', value: reservation.users },
    { key: 'Nodes', value: nodes || 'N/A' },
    { key: 'Node Count', value: reservation.node_cnt || 'N/A' },
    { key: 'Partition', value: reservation.partition || 'N/A' },
  ];

  return (
    <div>
        <Table striped highlightOnHover withColumnBorders>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Field</Table.Th>
              <Table.Th>Value</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {fieldsToDisplay.map((field, index) => (
              <Table.Tr key={index}>
                <Table.Td>{field.key}</Table.Td>
                <Table.Td>{field.value}</Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>

      {/* {errors && errors.length > 0 && (
        <Card mt="md">
          <Text color="red" mt="md">Errors:</Text>
          <Table striped highlightOnHover>
            <Table.Tbody>
              {errors.map((error, index) => (
                <Table.Tr key={index}>
                  <Table.Td>
                    <IconAlertCircle size={20} color="red" />
                  </Table.Td>
                  <Table.Td>
                    <Text color="red">{error}</Text>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </Card>
      )} */}
    </div>
  );
};

export default ReservationSummary;
