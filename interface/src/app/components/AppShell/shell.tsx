'use client';

import { AppShell, Burger, Group, Image } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import React, { ReactNode } from 'react';
import CustomNavBar from "../Navbar/navbar";

interface ShellProps {
    children: JSX.Element | ReactNode;
}


export const Shell = ({ children }: ShellProps) => {
    const [opened, { toggle }] = useDisclosure();

    return (
        <AppShell
            header={{ height: 60 }}
            navbar={{
                width: { base: 200, md: 270, xl: 300 },
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
                    <Image src="https://i0.wp.com/hpc4ai.unito.it/wp-content/uploads/2023/12/logo_hpc4ai.png?w=384&ssl=1" alt="HPC4AI" height={40} ml="md" />
                </Group>
            </AppShell.Header >

            <AppShell.Navbar p="md">
                <CustomNavBar />
            </AppShell.Navbar>

            <AppShell.Main m='sm'>{children}</AppShell.Main>

        </AppShell >
    );
}

export default Shell;