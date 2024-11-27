'use client'

import { Card, Button, TextInput, Group, Text, rem, Title, Center } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconAt } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
    const router = useRouter();
    const form = useForm(
        {
            initialValues: {
                email: '',
                password: ''
            },
            validate: {
                email: (value) => (!value || /^\S+@\S+$/.test(value) ? null : 'Invalid email'),
                password: (value) => (!value || value.length > 5 ? null : 'Password must be at least 6 characters long'),
            }
        }
    )

    return (
        <>
            <Card shadow="sm" radius="md" withBorder padding='xl'>
                <Center>
                    <Title order={1} mb='md'>Sign in with your account</Title>
                </Center>
                <TextInput
                    mt="md"
                    placeholder="Email"
                    width='300'
                    label='Email'
                    key={form.key('email')}
                    error={form.errors.email}
                    styles={{ input: { borderColor: form.errors.email ? 'red' : undefined } }}
                    {...form.getInputProps('email')}

                />
                <TextInput
                    mt="md"
                    placeholder="Password"
                    width='300'
                    label="Password"
                    type="password"
                    key={form.key('password')}
                    error={form.errors.password}
                    styles={{ input: { borderColor: form.errors.password ? 'red' : undefined } }}
                    {...form.getInputProps('password')}
                    mb='lg'
                />
                <Button variant="light" color="#A41517" onClick={() => {
                    router.push('/dashboard');
                }}> Login in</Button>
            </Card>
        </>
    );

}