'use client'

import { useState, useEffect, Suspense } from 'react';
import '@mantine/notifications/styles.css';
import { Stepper, Button, Group, rem } from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { IconUserCheck, IconSettings, IconCircleCheck, IconX, IconCheck } from '@tabler/icons-react';
import { StepInfo, StepSpecs, StepConfirmation, LoadingPage } from '@/components';
import { JobSubmissionSchema } from '@/schemas/job_submission_schema';
import { usePostData } from '@/hooks';
import { z } from 'zod';
import { useRouter, useSearchParams } from 'next/navigation';
import { spec } from 'node:test/reporters';

type JobSubmissionSchema = z.infer<typeof JobSubmissionSchema>;

const SubmitJobForm = () => {
  const [active, setActive] = useState(0);
  const { data, error, loading, callPost } = usePostData('/job/submit');
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const nodes = searchParams.getAll('nodes');
    if (nodes.length) {
      form.setFieldValue('specify_nodes', nodes.join(','));
      form.setFieldValue('nodes', nodes.length);
    }
  }, [searchParams]);

  const form = useForm({
    initialValues: {
      name: 'test',
      script: '',
      current_working_directory: '/beegfs/home/scontald',
      nodes: 0,
      tasks: 1,
      environment: { PATH: '/bin:/usr/bin/:/usr/local/bin/:/opt/slurm/bin/' },
      description: '',
      partition: '',
      specify_nodes: '',
      // immediate: false,
      // tmp_disk_space: undefined,
      // min_memory_per_cpu: undefined,
      // cpus_per_task: undefined,
      // tasks_per_node: undefined,
    },
    validate: {
      name: (value) => value.trim().length > 0 ? null : "Name is required",
      script: (value) => value.trim().length > 0 ? null : "Script is required",
      current_working_directory: (value) => value.trim().length > 0 ? null : "Current working directory is required",
      nodes: (value) => value >= 1 ? null : "At least 1 node is required",
        },
  });

  const onSubmit = async (values: JobSubmissionSchema) => {
    try {
      await JobSubmissionSchema.parseAsync(values);

      const specify_nodes_number = values.specify_nodes? values.specify_nodes.split(',').length : values.nodes;

      const formattedData = {
        job: {
          name: values.name,
          script: values.script,
          current_working_directory: values.current_working_directory,
          nodes: specify_nodes_number,
          tasks: values.tasks,
          environment: values.environment,
          partition: values.partition,
          specify_nodes: values.specify_nodes,
        },
      };

      const jsonData = JSON.stringify(formattedData, null, 2);

      try {
        await callPost(jsonData);
        console.log("Submission successful!");
        notifications.show({
          color: 'teal',
          icon: <IconCheck style={{ width: rem(18), height: rem(18), }} />,
          title: 'Job submitted',
          message: 'Your job has been successfully submitted.',
          autoClose: 5000,
        });
        router.push('/dashboard/jobs');

      } catch (error) {
        console.error("Submission Error:", error);
        notifications.show({
          color: 'red',
          icon: <IconX style={{ width: rem(18), height: rem(18), }} />,
          title: 'Job submission failed',
          message: 'Please try again later.',
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
    }
  };

  const handleNavigation = async () => {
    const errors = form.validate().errors;

    if (Object.keys(errors).length === 0) {
      if (active === 2) {
        {/* Change to < 3 when optional step is added */ }
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
        <Stepper active={active} onStepClick={setActive} completedIcon={<IconCircleCheck />} iconSize={47}>
          <Stepper.Step icon={<IconUserCheck />} label="Info" description="Fill in job details" />
          <Stepper.Step icon={<IconSettings />} label="Specs" description="Define job specifications" />
          {/* <Stepper.Step icon={<IconAdjustmentsHorizontal />} label="Optional" description="Add advanced settings" /> */}
          <Stepper.Step icon={<IconCircleCheck />} label="Confirmation" description="Review your choices" />
        </Stepper>
      </div>

      <div>
        {active === 0 && <StepInfo form={form} />}
        {active === 1 && <StepSpecs form={form} />}
        {/* {active === 2 && <StepOptional form={form} />} */}
        {active === 2 && <StepConfirmation form={form} />} {/* Change to < 3 when optional step is added */}

        <Group mt="xl">
          {active > 0 && (
            <Button variant="outline" onClick={() => setActive((current) => current - 1)}>
              Back
            </Button>
          )}

          <Button onClick={handleNavigation}>
            {active < 2 ? 'Next step' : 'Submit'} {/* Change to < 3 when optional step is added */}
          </Button>
        </Group>
      </div>
    </div>
  );
}

export default SubmitJobForm;