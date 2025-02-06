import { TextInput, Textarea, Group, Alert } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';

type Props = {
  form: UseFormReturnType<any>;
};

export default function StepInfo({ form }: Props) {
  return (
    <div>

      <TextInput
        label="Job Name"
        placeholder="e.g slurm-job"
        {...form.getInputProps("name")}
        mt="md"
        required
      />

      <Textarea
        label="Script"
        resize="vertical"
        placeholder={`e.g. #!/bin/bash\nsrun sleep 600`}
        {...form.getInputProps("script")}
        mt="md"
        required
      />

      <TextInput
        label="Current Working Directory"
        placeholder="e.g. /tmp"
        {...form.getInputProps("current_working_directory")}
        mt="md"
        required
      />

      <Textarea
        label="Environment Variables"
        placeholder={`e.g. PATH=/bin:/usr/bin/:/usr/local/bin/:/opt/slurm/bin \nEach line will be treated as a separate variable.`}
        {...form.getInputProps("environment")}
        autosize
        minRows={2}
        mt="md"
        required
      />

    </div>
  );
}
