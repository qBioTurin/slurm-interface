'use client'
import { UseFormReturnType } from '@mantine/form';
import { TextInput, NumberInput, Select, Switch, Card, Table, Text } from '@mantine/core';
import { useState, useEffect } from 'react';
import { ReservationSchema, SlurmReservationResponseSchema } from '@/schemas/reservation_schema';
import { useFetchData } from '@/hooks/useFetchData';
import { formatDate } from '@/utils/datetime';
import { z } from 'zod';

type Props = {
  form: UseFormReturnType<any>;
};

type NumberInputFieldProps = {
  label: string;
  form: UseFormReturnType<any>;
  fieldName: string;
  isDisabled?: boolean;
  max?: number;
};

const NumberInputField = ({ label, form, fieldName, isDisabled, max }: NumberInputFieldProps) => (
  <NumberInput
    label={label}
    {...form.getInputProps(fieldName)}
    min={1}
    max={max}
    disabled={isDisabled}
    mt="md"
  />
);

type Reservation = z.infer<typeof ReservationSchema>;

export default function StepSpecs({ form }: Props) {

  if (form.values.specify_nodes.length > 0) {
    return (
      <>
        <NumberInputField label="Number of Nodes" form={form} fieldName="nodes" isDisabled />
        <NumberInputField label="Number of Tasks" form={form} fieldName="tasks" />
        <TextInput
          label="Specify nodes"
          {...form.getInputProps('specify_nodes')}
          mt="md"
          disabled
        />
        <Select
          label="Partition"
          data={['broadwell', 'cascadelake', 'epito', 'gracehopper']}
          {...form.getInputProps('partition')}
        />
      </>
    );

  } else {
    const [useReservation, setUseReservation] = useState(false);
    const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null);
    const [reservations, setReservations] = useState<Reservation[]>([]);
    const { data, loading, error } = useFetchData('reservations', SlurmReservationResponseSchema);

    useEffect(() => {
      if (data) {
        setReservations(data);
      }
    }, [data]);

    const filteredReservations = reservations.filter(reservation => {
      const users = reservation.users.split(',');
      const user = process.env.CURRENT_USER || "";

      return users.includes(user); // TODO: get current user from auth context
    });


    return (
      <>
        <Switch
          label="Select Reservation"
          mt="md"
          checked={useReservation}
          onChange={(event) => {
            const value = event.currentTarget.checked;
            setUseReservation(value);
            if (!value) {
              form.setFieldValue('nodes', '');
              form.setFieldValue('partition', '');
            }
          }}
        />

        {useReservation ? (
          <>
            <Select
              label="Reservation"
              data={filteredReservations.map(reservation => ({
                value: reservation.name,
                label: reservation.name,
              }))}
              value={selectedReservation?.name}
              onChange={(selectedValue) => {
                form.setFieldValue('reservation', selectedValue);
                const selectedReservation = filteredReservations.find(reservation => reservation.name === selectedValue);
                if (selectedReservation) {
                  setSelectedReservation(selectedReservation);
                  form.setFieldValue('nodes', selectedReservation.node_list.split(',').length);
                }
              }}
              mt='md'
            />

            {selectedReservation !== null && (
              <Card mt="md" withBorder radius="md">
                <Text size="xl">Reservation details</Text>
                <Table striped highlightOnHover withColumnBorders>
                  <Table.Tbody>
                    <Table.Tr>
                      <Table.Td>Start Time</Table.Td>
                      <Table.Td>{formatDate(selectedReservation.start_time.number)}</Table.Td>
                    </Table.Tr>
                    <Table.Tr>
                      <Table.Td>End Time</Table.Td>
                      <Table.Td>{formatDate(selectedReservation.end_time.number)}</Table.Td>
                    </Table.Tr>
                    <Table.Tr>
                      <Table.Td>Nodes</Table.Td>
                      <Table.Td>{selectedReservation.node_list || 'N/A'}</Table.Td>
                    </Table.Tr>
                  </Table.Tbody>
                </Table>
              </Card>
            )}

            <NumberInputField
              label="Number of Nodes"
              max={selectedReservation?.node_count}
              form={form}
              fieldName="nodes"
            />
            <NumberInputField label="Number of Tasks" form={form} fieldName="tasks" />
            <Select
              label="Partition"
              // data={['broadwell']} // test partitions
              data={['broadwell-booked', 'cascadelake-booked', 'epito-booked', 'gracehopper-booked']} // prod partitions
              {...form.getInputProps('partition')}
            />
          </>

        ) : (

          <>
            <NumberInputField label="Number of Nodes" form={form} fieldName="nodes" />
            <NumberInputField label="Number of Tasks" form={form} fieldName="tasks" />
            <Select
              label="Partition"
              data={['broadwell', 'cascadelake', 'epito', 'gracehopper']}
              {...form.getInputProps('partition')}
              mt='sm'
            />
          </>
        )
        }
      </>
    );
  }

}
