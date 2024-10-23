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
        value={form.watch('nodes')}
        min={1}
        onChange={(value) => form.setValue('nodes', value || 1)} 
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
        value={form.watch('tasks')}
        min={1}
        onChange={(value) => form.setValue('tasks', value || 1)} 
      />
    </>
  );
}
