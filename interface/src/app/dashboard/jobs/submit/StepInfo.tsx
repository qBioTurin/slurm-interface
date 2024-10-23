// StepInfo.tsx
import { UseFormReturn } from 'react-hook-form';
import { TextInput, Textarea } from '@mantine/core';

type Props = {
  form: UseFormReturn<any>;
};

export default function StepInfo({ form }: Props) {
  return (
    <div>
      <TextInput
        label="Job Name"
        placeholder="Enter job name"
        {...form.register("name", { required: true })}
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
        {...form.register("script", { required: true })}
        required
      />

      <TextInput
        label="Current Working Directory"
        placeholder="Enter working directory"
        {...form.register("current_working_directory")}
        defaultValue=""
      />

      <Textarea
        label="Environment Variables"
        placeholder="Enter environment variables (e.g. PATH=/usr/bin:/bin)"
        {...form.register("environment.PATH", { required: true })}
        autosize
        minRows={2}
        defaultValue=""
      />
      </div>
  );
}
