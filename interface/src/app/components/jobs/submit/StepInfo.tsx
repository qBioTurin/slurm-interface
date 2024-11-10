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
        placeholder="Enter job name"
        {...form.getInputProps("name")}
        mt="md"
        required
      />

      {/* 
      <Textarea
        label="Description (optional)"
        placeholder="Enter job description"
        {...form.register("description")}
        autosize
        minRows={2}
      /> */}

      <TextInput
        label="Script"
        placeholder="Enter script"
        {...form.getInputProps("script")}
        mt="md"
        required
      />

      <TextInput
        label="Current Working Directory"
        placeholder="Enter working directory"
        {...form.getInputProps("current_working_directory")}
        mt="md"
      />

      <Textarea
        label="Environment Variables"
        placeholder="Enter environment variables (e.g. PATH=/usr/bin:/bin)"
        {...form.getInputProps("environment.PATH")}
        autosize
        minRows={2}
        mt="md"
      />

    </div>
  );
}
