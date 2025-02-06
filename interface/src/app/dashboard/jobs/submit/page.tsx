'use client'

import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import '@mantine/notifications/styles.css';
import { Stepper, Button, Group, rem } from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { IconUserCheck, IconSettings, IconCircleCheck, IconX, IconCheck } from '@tabler/icons-react';
import { JobSubmissionSchema } from '@/schemas/job_submission_schema';
import { usePostData } from '@/hooks';
import { z } from 'zod';
import { useRouter, useSearchParams } from 'next/navigation';

// Lazy load components
const StepInfo = dynamic(() => import('@/components/jobs/submit/StepInfo'));
const StepSpecs = dynamic(() => import('@/components/jobs/submit/StepSpecs'));
const StepConfirmation = dynamic(() => import('@/components/jobs/submit/StepConfirmation'));

type JobSubmissionSchema = z.infer<typeof JobSubmissionSchema>;

const SubmitJobForm = () => {
  const [active, setActive] = useState(0);
  const { callPost } = usePostData('/job/submit');
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const nodes = searchParams.getAll('nodes');
    if (nodes.length) {
      form.setFieldValue('required_nodes', nodes);
      form.setFieldValue('nodes', nodes.length.toString());
    }
  }, [searchParams]);

  const form = useForm({
    initialValues: {
      name: 'slurm-job',
      script: '#!/bin/bash\nsrun sleep 600',
      current_working_directory: process.env.CURRENT_WORKING_DIR || '',
      nodes: '1' as string,
      tasks: 1,
      environment: '',
      description: '',
      partition: '',
      required_nodes: [] as string[],
      reservation: '',
    },
    validate: {
      name: (value) => value.trim().length > 0 ? null : "Name is required",
      script: (value) => value.trim().length > 0 ? null : "Script is required",
      current_working_directory: (value) => value.trim().length > 0 ? null : "Current working directory is required",
      nodes: (value) => parseInt(value, 10) >= 1 ? null : "At least 1 node is required",
      partition: (value) => value.trim().length > 0 ? null : "Partition is required",
    },
  });

  const onSubmit = async (values: JobSubmissionSchema) => {
    try {
      await JobSubmissionSchema.parseAsync(values);

      console.log("Values: ", values); //debug

      const required_nodes_number = (values.required_nodes?.length ?? 0) > 0 ? (values.required_nodes?.length ?? 0).toString() : values.nodes;
      const environment_variables = (values.environment || '').split('\n').filter((line) => line.trim().length > 0).map((line) => String(line));

      const formattedData = {
        job: {
          name: values.name,
          script: values.script,
          current_working_directory: values.current_working_directory,
          nodes: required_nodes_number,
          tasks: values.tasks,
          environment: values.environment ? environment_variables : undefined,
          partition: values.partition,
          required_nodes: values.required_nodes,
          reservation: values.reservation,
        },
      };

      console.log("Formatted Data: ", formattedData); //debug
      console.log("Types: ", {
        name: typeof formattedData.job.name,
        script: typeof formattedData.job.script,
        current_working_directory: typeof formattedData.job.current_working_directory,
        nodes: typeof formattedData.job.nodes,
        tasks: typeof formattedData.job.tasks,
        environment: typeof formattedData.job.environment,
        partition: typeof formattedData.job.partition,
        required_nodes: typeof formattedData.job.required_nodes,
        reservation: typeof formattedData.job.reservation,
      }); //debug

      console.log("Environment is array of strings: ", Array.isArray(formattedData.job.environment) && formattedData.job.environment.every(item => typeof item === 'string')); //debug

      const jsonData = JSON.stringify(formattedData, null, 2);

      console.log("Json data: ", jsonData); //debug

      try {
        await callPost(jsonData);
        notifications.show({
          color: 'teal',
          icon: <IconCheck style={{ width: rem(18), height: rem(18), }} />,
          title: 'Job submitted',
          message: 'Your job has been successfully submitted.',
          autoClose: 5000,
        });

      } catch (error: any) {
        notifications.show({
          color: 'red',
          icon: <IconX style={{ width: rem(18), height: rem(18), }} />,
          title: 'Job submission failed',
          message: error.message,
          autoClose: 5000,
        });
      }

    } catch (error) {
      console.error("Validation Error:", error);
      notifications.show({
        color: 'red',
        icon: <IconX style={{ width: rem(18), height: rem(18), }} />,
        title: 'Job submission failed',
        message: 'Please try again later.',
        autoClose: 5000,
      });
    } finally {
      router.push('/dashboard/jobs');
    }
  };

  const handleNavigation = async () => {
    const errors = form.validate().errors;

    if (active === 0 && Object.keys(errors).length === 1 && form.values.partition === '') {
      setActive((current) => current + 1);
    } else if (Object.keys(errors).length === 0) {
      if (active === 2) {
        onSubmit(form.values);
        return;
      } else {
        setActive((current) => current + 1);
      }
    };
  }

  return (
    <div>

      <div>
        <Stepper active={active} completedIcon={<IconCircleCheck />} iconSize={47}>
          <Stepper.Step icon={<IconUserCheck />} label="Info" description="Fill in job details" />
          <Stepper.Step icon={<IconSettings />} label="Specs" description="Define job specifications" />
          <Stepper.Step icon={<IconCircleCheck />} label="Confirmation" description="Review your choices" />
        </Stepper>
      </div>

      <div>
        {active === 0 && <StepInfo form={form} />}
        {active === 1 && <StepSpecs form={form} />}
        {active === 2 && <StepConfirmation form={form} />}

        <Group mt="xl">
          {active > 0 && (
            <Button variant="outline" onClick={() => setActive((current) => current - 1)}>
              Back
            </Button>
          )}

          <Button onClick={handleNavigation}>
            {active < 2 ? 'Next step' : 'Submit'}
          </Button>
        </Group>
      </div>
    </div>
  );
}

export default SubmitJobForm;