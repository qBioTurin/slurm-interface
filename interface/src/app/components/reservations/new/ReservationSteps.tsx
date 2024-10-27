import { TextInput, MultiSelect } from '@mantine/core';
import { DateTimePicker } from '@mantine/dates';
import { UseFormReturnType } from '@mantine/form';

interface ReservationStepProps {
  form: UseFormReturnType<any>;
  users: { name: string }[];
  mockNodes: { id: string; nodeName: string }[];
}

export default function ReservationStep({ form, users, mockNodes }: ReservationStepProps) {

  return (
    <>
      <TextInput
        label="Reservation Name"
        placeholder="Name"
        mt="md"
        {...form.getInputProps('name')}
      />

      <DateTimePicker
        label="Start Time"
        valueFormat="YYYY-MM-DDTHH:mm:ss"
        value={form.values.start_time.getTime() === new Date(0).getTime() ? null : form.values.start_time}
        placeholder="Start Time"
        {...form.getInputProps('start_time')}
        onChange={(value) => {
          form.setFieldValue('start_time', value);
        }}
        mt="md"
      />

      <DateTimePicker
        label="End Time"
        valueFormat="YYYY-MM-DDTHH:mm:ss"
        value={form.values.end_time.getTime() === new Date(0).getTime() ? null : form.values.end_time}
        placeholder="End Time"
        {...form.getInputProps('end_time')}
        onChange={(value) => {
          form.setFieldValue('end_time', value);
        }}
        mt="md"
      />

      <MultiSelect
        data={users.map((user) => user.name)}
        label="Select Additional Users"
        placeholder="Add users"
        mt="md"
        searchable
        value={form.values.users}
        onChange={(selectedUsers) => {
          const uniqueUsers = Array.from(new Set([...selectedUsers, users[0].name]));
          form.setFieldValue('users', uniqueUsers);
        }}
      />

      <MultiSelect
        data={mockNodes.map((node) => node.nodeName)}
        label="Nodes"
        placeholder="Select nodes"
        mt="md"
        searchable
        value={form.values.nodes}
        onChange={(value) => form.setFieldValue('nodes', value)}
      />

      {/* <NumberInput
        label="Node Count"
        {...form.getInputProps('NodeCnt')}
        min={0}
        max={200} // arbitrary value
        mt="md"
    /> */}

      {/* <MultiSelect
        data={partitions.map((partition) => partition.name)}
        label="Partitions"
        placeholder="Select partition"
        mt="md"
        searchable
        value={form.values.nodes}
        onChange={(value) => form.setFieldValue('partition', value[0])}
        maxValues={1}
    /> */}
    </>
  );
}
