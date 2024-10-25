import { UseFormReturnType } from '@mantine/form';
import { TextInput, NumberInput, Select } from '@mantine/core';

type Props = {
  form: UseFormReturnType<any>;
};

type NumberInputFieldProps = {
  label: string;
  form: UseFormReturnType<any>;
  fieldName: string;
};

const NumberInputField = ({ label, form, fieldName }: NumberInputFieldProps) => (
  <NumberInput
    label={label}
    {...form.getInputProps(fieldName)}
    min={1}
  />
);

export default function StepSpecs({ form }: Props) {

  return (
    <>
      <NumberInputField label="Number of Nodes" form={form} fieldName="nodes" />

      {/* <TextInput
        label="Specify Nodes (optional)"
        {...form.getInputProps('specify_nodes')}
      /> */}

      {/* <Select
        label="Partition (optional)"
        data={['general', 'gpu', 'debug']}
        {...form.getInputProps('partition')}
      /> */}

      <NumberInputField label="Number of Tasks" form={form} fieldName="tasks" />
    </>
  );
}
