import { UseFormReturn } from 'react-hook-form';
import { TextInput, NumberInput, Select } from '@mantine/core';

type Props = {
  form: UseFormReturn<any>;
};

export default function StepSpecs({ form }: Props) {
  const { register, formState: { errors }, setValue, watch } = form;

  return (
    <>
      <NumberInput
        label="Number of Nodes"
        {...register('nodes', { valueAsNumber: true })}
        error={errors.nodes?.message}
        min={1}
      />
      {/* <TextInput
        label="Specify Nodes (optional)"
        {...register('specify_nodes')}
        error={errors.specify_nodes?.message}
      /> */}
      {/* <Select
        label="Partition (optional)"
        data={['general', 'gpu', 'debug']}
        {...register('partition')}
      /> */}
      <NumberInput
        label="Number of Tasks"
        {...register('tasks', { valueAsNumber: true })}
        error={errors.tasks?.message}
        min={1}
      />
    </>
  );
}
