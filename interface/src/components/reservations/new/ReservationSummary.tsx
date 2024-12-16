import React from 'react';
import { Table } from '@mantine/core';

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

    </div>
  );
};

export default ReservationSummary;
