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
                    {/* <img src={'/logo_hpc4ai.png'} alt="HPC4AI" height={40} /> */}
                    <Image src={'/logo_hpc4ai.png'} alt="HPC4AI" height={40} ml="md" />
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