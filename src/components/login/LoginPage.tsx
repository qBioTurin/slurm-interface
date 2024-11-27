'use client'


import { Grid, Flex, rem, Card, AppShell } from '@mantine/core';
import { LoginForm } from '@/components';


export default function LoginPage() {


    return (
        <AppShell>

            <AppShell.Main pt={`calc(${rem(60)} + var(--mantine-spacing-md))`}>
                <Grid justify='center' align='center'>
                    <Grid.Col span={4}>
                        <LoginForm />
                    </Grid.Col>
                </Grid>
            </AppShell.Main>
        </AppShell>
    );
}