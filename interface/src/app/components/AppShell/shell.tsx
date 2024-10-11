'use client';

import { AppShell, Burger, Group } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import React, { ReactNode } from 'react';

import CustomNavBar from "../Navbar/navbar";
import { MantineLogo } from '@mantinex/mantine-logo'

interface ShellProps {
    children: JSX.Element | ReactNode;
}


export const Shell = ({ children }: ShellProps) => {
    const [opened, { toggle }] = useDisclosure();

    return (
        <AppShell
            header={{ height: 60 }}
            navbar={{
                width: 300,
                breakpoint: 'sm',
                collapsed: { mobile: !opened },
            }}
            padding="md"
        >

            <AppShell.Header>
                <Group h="100%" px="md">
                    <Burger
                        opened={opened}
                        onClick={toggle}
                        hiddenFrom="sm"
                        size="sm"
                    />
                    <MantineLogo size={30} />
                </Group>
            </AppShell.Header >

            <AppShell.Navbar p="md">
                <CustomNavBar />
            </AppShell.Navbar>

            <AppShell.Main>{children}</AppShell.Main>

        </AppShell >
    );

}