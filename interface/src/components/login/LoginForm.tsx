'use client'

import { Card, Space, Button, TextInput, Group, Text, Stack, Title, Center } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useRouter } from 'next/navigation';
import Image from "next/image";
import logo from "@/assets/logo_hpc4ai.png"
import { signIn } from "next-auth/react";
import GoogleButton from 'react-google-button'
import { IconArrowRight } from '@tabler/icons-react';
import { GoogleIcon } from './googleIcon';

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
            <Card shadow="xl" radius="md" withBorder padding='4em' >
                <Stack justify='center' align='center' m='xl' mt='xs' >
                    <Image src={logo} alt="HPC4AI" height={100} />
                    {/* <Space h='2em' /> */}

                    <Group><Title fw='900' size='40' mt='md' mb='xs'>Sign</Title><Title fw='900' size='40' mt='md' mb='xs' c='#A41517'>in</Title> </Group>
                    <Text c='dimmed' mb='1' lineClamp={2} h='21' >Access with your Google</Text>
                    <Text c='dimmed' mb='sm' p='0' h='21' lh='30%'> account.</Text>

                    {/*<TextInput
                        placeholder="Email"
                        width='300'
                        label='Email'
                        key={form.key('email')}
                        error={form.errors.email}
                        styles={{
                            input: {

                                borderColor: form.errors.email ? 'red' : undefined,
                                '&:focus': { borderColor: 'black' }
                            }
                        }}
                        {...form.getInputProps('email')}
                        w='100%'
                        size='md'
                        mb='xs'

                    />
                    <TextInput
                        placeholder="Password"
                        width='300'
                        label="Password"
                        type="password"
                        key={form.key('password')}
                        error={form.errors.password}
                        styles={{ input: { borderColor: form.errors.password ? 'red' : undefined } }}
                        {...form.getInputProps('password')}
                        mb='xl'
                        w='100%'
                        size='md'
                    />
                   */}
                    <Button
                        leftSection={<GoogleIcon />}
                        variant="outline" color='black' onClick={() => signIn("keycloak")}
                        justify='center'
                    > Continue with Google</Button>
                    {/* <GoogleButton type='light' onClick={() => signIn("keycloak")} /> */}
                </Stack>
            </Card>
        </>
    );

}
