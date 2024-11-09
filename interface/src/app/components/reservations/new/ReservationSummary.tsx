import React from 'react';

import { Card, Text, List, ThemeIcon} from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons-react';

type ReservationSummaryProps = {
  reservation: {
    name: string;
    start_time: Date;
    end_time: Date;
    users: string[];
    nodes: string;
    // partition?: string;
    errors?: string[];
  };
};

export const ReservationSummary = ({ reservation }: ReservationSummaryProps) => {
  const { name, start_time, end_time, users, nodes, errors } = reservation;

  return (
    <div>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Text size="lg" mb="md">Reservation Summary</Text>
        <Text><strong>Name:</strong> {name}</Text>
        <Text><strong>Start Time:</strong> {new Date(start_time).toLocaleString()}</Text>
        <Text><strong>End Time:</strong> {new Date(end_time).toLocaleString()}</Text>
        <Text><strong>Users:</strong> {Array.isArray(users) && users.length > 0 ? users.join(', ') : 'None'}</Text>
        <Text><strong>Nodes:</strong> {nodes? nodes : 'None'}</Text>
        {/* {partition && <Text><strong>Partition:</strong> {partition}</Text>} */}
      </Card>

      <Card>
        {errors && errors.length > 0 && (
          <>
            <Text mt="md" color="red">Errors:</Text>
            <List spacing="xs" size="sm" mb="md" center>
              {errors.map((error, index) => (
                <List.Item key={index}>
                  <ThemeIcon color="red" size={20} radius="xl">
                    ⚠️
                  </ThemeIcon>
                  <Text color="red">{error}</Text>
                </List.Item>
              ))}
            </List>
          </>
        )}
      </Card>
    </div>
  );
};

export default ReservationSummary;
