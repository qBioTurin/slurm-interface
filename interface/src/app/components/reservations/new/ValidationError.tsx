import { Alert } from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons-react';

interface ValidationErrorProps {
    validationError: string | null;
    setValidationError: (value: string | null) => void;
  }

export default function ValidationError({ validationError, setValidationError }: ValidationErrorProps) {
  return (
    validationError && (
      <Alert
        icon={<IconAlertCircle size={16} />}
        title="Validation Error"
        color="red"
        withCloseButton
        closeButtonLabel="Close alert"
        onClose={() => setValidationError(null)}
        mt="md"
      >
        {validationError}
      </Alert>
    )
  );
}
