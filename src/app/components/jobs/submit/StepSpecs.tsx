import { UseFormReturnType } from '@mantine/form';
import { TextInput, NumberInput, Select } from '@mantine/core';

type Props = {
  form: UseFormReturnType<any>;
};

type NumberInputFieldProps = {
  label: string;
  form: UseFormReturnType<any>;
  fieldName: string;
  isDisabled?: boolean;
};

const NumberInputField = ({ label, form, fieldName, isDisabled }: NumberInputFieldProps) => (
  <NumberInput
    label={label}
    {...form.getInputProps(fieldName)}
    min={1}
    disabled={isDisabled}
    mt="md"
  />
);

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
        />
      </>
    );
  } else {
    return (
      <>
        <NumberInputField label="Number of Nodes" form={form} fieldName="nodes" />
        <NumberInputField label="Number of Tasks" form={form} fieldName="tasks" />
        {/* <Select
        label="Partition (optional)"
        data={['general', 'gpu', 'debug']}
        {...form.getInputProps('partition')}
      /> */}

      </>
    );
  }

}
