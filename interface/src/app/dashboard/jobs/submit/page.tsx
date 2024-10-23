'use client'

import { useState } from 'react';
import { Stepper, Button, Group, rem } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconUserCheck, IconSettings, IconAdjustmentsHorizontal, IconCircleCheck } from '@tabler/icons-react';
import {z} from 'zod';
import StepInfo from './StepInfo';
import StepSpecs from './StepSpecs';
import StepOptional from './StepOptional';
import StepConfirmation from './StepConfirmation';
import { JobSubmissionSchema } from '@/schemas/job_submission_schema';
import styles from './SubmitJobForm.module.css';

type JobSubmissionSchema = z.infer<typeof JobSubmissionSchema>;

const validateJobSubmission = (values: JobSubmissionSchema) => {
  const parsed = JobSubmissionSchema.safeParse(values);
  return parsed.success ? null : parsed.error.format();
};

const SubmitJobForm = () => {
        const [active, setActive] = useState(0);
        const [errors, setErrors] = useState({});

        const form = useForm({
          initialValues: {
            name: '',
            script: '',
            current_working_directory: '',
            nodes: 1,
            tasks: 1,
            environment: { PATH: '' },
            // description: '',
            // partition: '',
            // specify_nodes: '',
            // immediate: false,
            // tmp_disk_space: undefined,
            // min_memory_per_cpu: undefined,
            // cpus_per_task: undefined,
            // tasks_per_node: undefined,
          },
        });
      
        const nextStep = () => {
          const validationErrors = validateJobSubmission(form.values)
          const isLastStep = active === 3; // Confirm step
          if (validationErrors) {
            setErrors(validationErrors);
            console.log('Validation errors:', validationErrors);
            return;
          }

          if (isLastStep) {
            console.log(form.getValues());
          } else {
            setActive((current) => Math.min(current + 1, 3));
            setErrors({}); 
          }
        };
      
        const prevStep = () => {
          setActive((current) => Math.max(current - 1, 0));
          setErrors({});
        };

        return (
          <div className={styles.pageContainer}>
            <div className={styles.stepperContainer}>
              <Stepper
                active={active}
                onStepClick={setActive}
                completedIcon={<IconCircleCheck/>}
                iconSize={47}
              >
                <Stepper.Step
                  icon={<IconUserCheck/>}
                  label={<span>Info</span>}
                  description={<span>Fill in job details</span>}
                />
                <Stepper.Step
                  icon={<IconSettings/>}
                  label={<span>Specs</span>}
                  description={<span>Define job specifications</span>}
                />
                <Stepper.Step
                  icon={<IconAdjustmentsHorizontal/>}
                  label={<span>Optional</span>}
                  description={<span>Add advanced settings</span>}
                />
                <Stepper.Step
                  icon={<IconCircleCheck/>}
                  label={<span>Confirmation</span>}
                  description={<span>Review your choices</span>}
                />
              </Stepper>
            </div>
      
            <div className={styles.formContainer}>
              {active === 0 && <StepInfo form={form} />}
              {active === 1 && <StepSpecs form={form} />}
              {active === 2 && <StepOptional form={form} />}
              {active === 3 && <StepConfirmation form={form} />}
      
              <Group mt="xl">
                {active > 0 && (
                  <Button variant="outline" onClick={prevStep}>
                    Back
                  </Button>
                )}

                <Button onClick={nextStep}>
                  {active < 3 ? 'Next step' : 'Submit'}
                </Button>

              </Group>
            </div>
          </div>
        );
      };
      
      export default SubmitJobForm;