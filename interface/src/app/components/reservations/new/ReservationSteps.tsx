import { TextInput } from '@mantine/core';
import { DateTimePicker } from '@mantine/dates';
import { UseFormReturnType } from '@mantine/form';

interface ReservationStepProps {
  form: UseFormReturnType<any>;
}

export default function ReservationStep({ form }: ReservationStepProps) {

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
        {...form.getInputProps('end_time')}
        onChange={(value) => {
          form.setFieldValue('end_time', value);
        }}
        mt="md"
      />

      <TextInput 
        label="Node list"
        placeholder="e.g. node1,node2,node3 (separated by commas)" 
        mt="md"
        {...form.getInputProps('nodes')}
      />

      {/* <NumberInput
        label="Node Count"
        {...form.getInputProps('NodeCnt')}
        min={0}
        max={200} // arbitrary value
        mt="md"
      />

      <MultiSelect
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
