'use client'

import { TextInput, NumberInput, Select, Switch, Card } from '@mantine/core';
import { useState } from 'react';
import { DateTimePicker } from '@mantine/dates';
import { UseFormReturnType } from '@mantine/form';

interface ReservationStepProps {
  form: UseFormReturnType<any>;
  partitions: { name: string }[];
  nodesSelected: boolean;
}

export default function ReservationStep({ form, partitions, nodesSelected }: ReservationStepProps) {
  const [isNodes, setIsNodes] = useState(nodesSelected);

  return (
    <>
      <TextInput
        label="Reservation Name"
        placeholder="Name"
        mt="md"
        {...form.getInputProps('name')}
        error={form.errors.name}
        styles={{ input: { borderColor: form.errors.name ? 'red' : undefined } }}
      />

      <DateTimePicker
        label="Start Time"
        valueFormat="YYYY-MM-DDTHH:mm:ss"
        value={form.values.start_time.getTime() === new Date(0).getTime() ? null : form.values.start_time}
        {...form.getInputProps('start_time')}
        onChange={(value) => {
          form.setFieldValue('start_time', value);
          if (value) {
            form.setFieldValue('end_time', new Date(value.getTime() + 60 * 60 * 1000));
          }
        }}
        mt="md"
        error={form.errors.start_time}
        styles={{ input: { borderColor: form.errors.start_time ? 'red' : undefined } }}
      />

      <DateTimePicker
        label="End Time"
        valueFormat="YYYY-MM-DDTHH:mm:ss"
        value={form.values.end_time.getTime() === new Date(0).getTime() ? null : form.values.end_time}
        {...form.getInputProps('end_time')}
        onChange={(value) => {
          form.setFieldValue('end_time', value);
        }}
        mt="md"
        error={form.errors.end_time}
        styles={{ input: { borderColor: form.errors.end_time ? 'red' : undefined } }}
      />

      <Card mt="md" withBorder radius="md">

        <Switch
          label="Specify Nodes"
          mt="md"
          checked={isNodes}
          onChange={(event) => {
            const value = event.currentTarget.checked;
            setIsNodes(value);
            if (!value) {
              form.setFieldValue('nodes', '');
              form.setFieldValue('node_cnt', undefined);
              form.setFieldValue('partition', '');
            }
          }}
          disabled={nodesSelected}
        />

        {isNodes ? (
          <TextInput
            label="Node list"
            placeholder="e.g. node1,node2,node3 (separated by commas)"
            mt="md"
            {...form.getInputProps('nodes')}
            error={form.errors.nodes}
            styles={{ input: { borderColor: form.errors.nodes ? 'red' : undefined } }}
          />
        ) : (
          <>
            <NumberInput
              label="Node Count"
              {...form.getInputProps('node_cnt')}
              min={0}
              max={100} // arbitrary value
              mt="md"
              hideControls
            />

            <Select
              data={partitions.map((partition) => partition.name)}
              label="Partition"
              placeholder="Select partition"
              mt="md"
              searchable
              value={form.values.partition}
              disabled={form.values.useNodeList}
              onChange={(value) => form.setFieldValue('partition', value)}
            />
          </>
        )}
      </Card>
    </>
  );
}
