'use client'

import { useState } from 'react';
import { Stepper, Button, Group, Notification } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useRouter } from 'next/navigation';
import { IconUserCheck, IconSettings, IconAdjustmentsHorizontal, IconCircleCheck, IconX } from '@tabler/icons-react';
import { z } from 'zod';
import StepInfo from '../../../components/jobs/submit/StepInfo';
import StepSpecs from '../../../components/jobs/submit/StepSpecs';
import StepOptional from '../../../components/jobs/submit/StepOptional';
import StepConfirmation from '../../../components/jobs/submit/StepConfirmation';
import ValidationError from '@/components/commons/ValidationError';
import { JobSubmissionSchema } from '@/schemas/job_submission_schema';
import styles from './SubmitJobForm.module.css';
import { usePostSlurmData } from '@/hooks/usePostSlurmData';


type JobSubmissionSchema = z.infer<typeof JobSubmissionSchema>;

const validateJobSubmission = (values: JobSubmissionSchema) => {
  const parsed = JobSubmissionSchema.safeParse(values);
  return parsed.success ? null : parsed.error.format();
};

const SubmitJobForm = () => {
  const [active, setActive] = useState(0);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);
  const { data, error, loading, callPost } = usePostSlurmData('api/slurm/v0.0.41/job/submit');
  const router = useRouter();

  const form = useForm({
    initialValues: {
      name: 'test',
      script: '#!/bin/bash\nsrun sleep 600',
      current_working_directory: '/tmp',
      nodes: 1,
      tasks: 1,
      environment: { PATH: '/bin:/usr/bin/:/usr/local/bin/:/opt/slurm/bin' },
      // description: '',
      // partition: '',
      // specify_nodes: '',
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
      tasks: (value) => value >= 1 ? null : "At least 1 task is required",
    },
  });

  const onSubmit = async (values: JobSubmissionSchema) => {
    const errors = form.validate().errors;
    try {
      await JobSubmissionSchema.parseAsync(values);

      const formattedData = {
        job: {
          name: values.name,
          script: values.script,
          current_working_directory: values.current_working_directory,
          nodes: values.nodes,
          tasks: values.tasks,
          environment: values.environment,
        },
      };

      console.log("Formatted Job Type: ", typeof formattedData); //debug
      console.log("Formatted Job Submission Data:", formattedData); //debug
      const jsonData = JSON.stringify(formattedData, null, 2);
      console.log("Stringified Job Type: ", typeof jsonData); //debug
      console.log("Stringified Job Submission Data:", jsonData); //debug

      setValidationError(null);

      try {
        await callPost(jsonData);
        console.log("Submission successful!");
        setNotification({ message: 'Job submitted successfully!', type: 'success' });

      } catch (error) {
        console.error("Submission Error:", error);
        setValidationError('There was an error while submitting the form.');
        setNotification({ message: 'Job submission failed!', type: 'error' });
      }

    } catch (error) {
      console.error("Validation Error:", error);
      setValidationError('There was an error while submitting the form.');
      setNotification({ message: 'Job submission failed!', type: 'error' });
    }
  };

  const handleNavigation = async () => {
    const errors = form.validate().errors;

    if (Object.keys(errors).length) {
      setValidationError(Object.values(errors).join(', '));
      return;
    }
    setValidationError(null);

    if (active === 3) {
      onSubmit(form.values);
      return;
    }
    setActive((current) => current + 1);
  };

  if (notification) {
    return (
      <Notification
        icon={notification.type === 'success' ? <IconCircleCheck size={18} /> : <IconX size={18} />}
        color={notification.type === 'success' ? 'teal' : 'red'}
        onClose={() => router.push('/dashboard/jobs')}
        mt="md"
      >
        {notification.message}
      </Notification>
    );
  } else {
    return (
      <div className={styles.pageContainer}>
        {/* <ValidationError validationError={validationError} 
            setValidationError={setValidationError} /> */}


        <div className={styles.stepperContainer}>
          <Stepper active={active} onStepClick={setActive} completedIcon={<IconCircleCheck />} iconSize={47}>
            <Stepper.Step icon={<IconUserCheck />} label="Info" description="Fill in job details" />
            <Stepper.Step icon={<IconSettings />} label="Specs" description="Define job specifications" />
            <Stepper.Step icon={<IconAdjustmentsHorizontal />} label="Optional" description="Add advanced settings" />
            <Stepper.Step icon={<IconCircleCheck />} label="Confirmation" description="Review your choices" />
          </Stepper>
        </div>

        <div className={styles.formContainer}>
          {active === 0 && <StepInfo form={form} />}
          {active === 1 && <StepSpecs form={form} />}
          {active === 2 && <StepOptional form={form} />}
          {active === 3 && <StepConfirmation form={form} />}

          <Group mt="xl">
            {active > 0 && (
              <Button variant="outline" onClick={() => setActive((current) => current - 1)}>
                Back
              </Button>
            )}

            <Button onClick={handleNavigation}>
              {active < 3 ? 'Next step' : 'Submit'}
            </Button>
          </Group>
        </div>
      </div>
    );
  };
}

export default SubmitJobForm;