'use client'

import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Stepper, Button, Group, rem } from '@mantine/core';
import { IconUserCheck, IconSettings, IconAdjustmentsHorizontal, IconCircleCheck } from '@tabler/icons-react';
import * as z from 'zod';
import StepInfo from './StepInfo';
import StepSpecs from './StepSpecs';
import StepOptional from './StepOptional';
import StepConfirmation from './StepConfirmation';
import { JobSubmissionSchema } from '@/schemas/job_submission_schema';
import styles from './SubmitJobForm.module.css';

type JobSubmissionSchema = z.infer<typeof JobSubmissionSchema>;

const SubmitJobForm = () => {
        const [active, setActive] = useState(0);
      
        const form = useForm({
          resolver: zodResolver(JobSubmissionSchema),
          defaultValues: {
            name: '', //debug
            script: '',
            current_working_directory: '',
            nodes: 1,
            tasks: 1,
            description: '',
            environment: { PATH: '' },
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
          const isLastStep = active === 3; // Confirm step
          if (isLastStep) {
            console.log(form.getValues());
          } else {
            setActive((current) => Math.min(current + 1, 3));
          }
        };
      
        const prevStep = () => setActive((current) => Math.max(current - 1, 0));

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