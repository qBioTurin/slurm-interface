import { UseFormReturnType } from '@mantine/form';
import { NumberInput, Checkbox } from '@mantine/core';

type Props = {
  form: UseFormReturnType<any>;
};

const NumberInputField = ({ label, form, fieldName }) => (
  <NumberInput
    label={label}
    {...form.getInputProps(fieldName, { type: 'number' })}
    min={1}
  />
);

const CheckboxField = ({ label, form, fieldName }) => (
  <Checkbox
    label={label}
    {...form.getInputProps(fieldName, { type: 'checkbox' })}
  />
);

export default function StepOptional({ form }: Props) {

  return (
    <>
      {/* <CheckboxField label="Immediate" form={form} fieldName="immediate" />

      <NumberInputField label="Temporary Disk Space (MB)" form={form} fieldName="tmp_disk_space" />
      <NumberInputField label="Minimum Memory per CPU (MB)" form={form} fieldName="min_memory_per_cpu" />
      <NumberInputField label="CPUs per Task" form={form} fieldName="cpus_per_task" />
      <NumberInputField label="Tasks per Node" form={form} fieldName="tasks_per_node" />
       */}
    </>
  );
}
