'use client';

import { AppShell, Burger, Group } from '@mantine/core';
import Image from "next/image";
import { useDisclosure } from '@mantine/hooks';
import React, { ReactNode, useEffect, useState } from 'react';
import { NavBar, Footer } from "@/components";
import logo from "@/assets/logo_hpc4ai.png";

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
                collapsed: { desktop: !opened, mobile: !opened },
            }}
            padding="md"
            styles={(theme) => ({
                main: {
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: 'calc(100vh-170px)',
                    paddingBottom: '50px',
                    // Ensure no padding at the bottom
                },
            })}
        >
            <AppShell.Header withBorder={false}>
                <Group h="100%" px="md">
                    <Burger
                        opened={opened}
                        onClick={toggle}
                        size="sm"
                    />
                    <Image src={logo} alt="HPC4AI" height={40} priority style={{ margin: '0 0 0 15px' }} />
                </Group>
            </AppShell.Header>

            <AppShell.Navbar p="md">
                <NavBar />
            </AppShell.Navbar>

            <AppShell.Main m='sm'>{children}</AppShell.Main>
            <AppShell.Footer withBorder={false} pos='unset'><Footer /></AppShell.Footer>
        </AppShell>
    );
}

export default Shell;