import { UseFormReturn } from 'react-hook-form';
import { NumberInput, Checkbox } from '@mantine/core';

type Props = {
  form: UseFormReturn<any>;
};

export default function StepOptional({ form }: Props) {
  const { register, formState: { errors } } = form;

  return (
    <>
      {/* <Checkbox
        label="Immediate"
        {...register('immediate')}
      />
      <NumberInput
        label="Temporary Disk Space (MB)"
        {...register('tmp_disk_space', { valueAsNumber: true })}
        error={errors.tmp_disk_space?.message}
      />
      <NumberInput
        label="Minimum Memory per CPU (MB)"
        {...register('min_memory_per_cpu', { valueAsNumber: true })}
        error={errors.min_memory_per_cpu?.message}
      />
      <NumberInput
        label="CPUs per Task"
        {...register('cpus_per_task', { valueAsNumber: true })}
        error={errors.cpus_per_task?.message}
      />
      <NumberInput
        label="Tasks per Node"
        {...register('tasks_per_node', { valueAsNumber: true })}
        error={errors.tasks_per_node?.message}
      /> */}
    </>
  );
}
