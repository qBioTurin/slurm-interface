'use client'

import { Card, Button, Group, Text, Stack, Title } from '@mantine/core';
import Image from "next/image";
import logo from "@/assets/logo_hpc4ai.png"
import { signIn } from "next-auth/react";
import { GoogleIcon } from './googleIcon';

export default function LoginCard() {
    return (
        <>
            <Card shadow="xl" radius="md" withBorder padding='4em' >
                <Stack justify='center' align='center' m='xl' mt='xs' >
                    <Image src={logo} alt="HPC4AI" height={100} />
                    <Group>
                        <Title fw='900' size='40' mt='md' mb='xs'>
                            Sign
                        </Title>
                        <Title fw='900' size='40' mt='md' mb='xs' c='#A41517'>
                            in
                        </Title>
                    </Group>
                    <Text c='dimmed' mb='1' lineClamp={2} h='21' >Access with your Google</Text>
                    <Text c='dimmed' mb='sm' p='0' h='21' lh='30%'> account.</Text>
                    <Button
                        leftSection={<GoogleIcon />}
                        variant="outline" color='black'
                        onClick={() => signIn("keycloak", { callbackUrl: `/dashboard` })}
                        justify='center'
                    > Continue with Google</Button>
                </Stack>
            </Card>
        </>
    );

}
