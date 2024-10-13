'use client';

import { TextInput, Button, Group } from '@mantine/core';

const ReserveNodeForm = () => {
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        // Handle form submission logic here
    };

    return (
        <form onSubmit={handleSubmit}>
            <TextInput placeholder="Node ID" required />
            <Group mt="md">
                <Button type="submit">Reserve Node</Button>
            </Group>
        </form>
    );
};

export default ReserveNodeForm;
