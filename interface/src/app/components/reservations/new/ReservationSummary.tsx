import React from 'react';
import { Card, Text } from '@mantine/core';

type ReservationSummaryProps = {
  reservation: {
    name: string;
    start_time: Date;
    end_time: Date;
    users: string[];
    nodes: string[];
    partition?: string;
  };
};

export const ReservationSummary = ({ reservation }: ReservationSummaryProps) => {
  const { name, start_time, end_time, users, nodes, partition } = reservation;

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Text size="lg" mb="md">Reservation Summary</Text>
      <Text><strong>Name:</strong> {name}</Text>
      <Text><strong>Start Time:</strong> {new Date(start_time).toLocaleString()}</Text>
      <Text><strong>End Time:</strong> {new Date(end_time).toLocaleString()}</Text>
      <Text><strong>Users:</strong> {users.length > 0 ? users.join(', ') : 'None'}</Text>
      <Text><strong>Nodes:</strong> {nodes.length > 0 ? nodes.join(', ') : 'None'}</Text>
      {partition && <Text><strong>Partition:</strong> {partition}</Text>}
    </Card>
  );
};
