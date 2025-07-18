'use client';

import { AppShell, Burger, Group } from '@mantine/core';
import Image from "next/image";
import { useDisclosure } from '@mantine/hooks';
import React, { ReactNode } from 'react';
import logo from "@/assets/logo_hpc4ai.png";
import { LogoutButton, NavBar, Footer } from "@/components";

interface ShellProps {
    children: JSX.Element | ReactNode;
}

export const Shell = ({ children }: ShellProps) => {
    const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
    const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(false);

    return (
        <AppShell
            header={{ height: 60 }}
            navbar={{
                width: { base: 200, md: 200, xl: 200 },
                breakpoint: 'sm',
                collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
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

            <AppShell.Header>
                <Group justify='space-between' h="100%">
                    <Group h="100%" px="md">
                        <Burger opened={mobileOpened} onClick={toggleMobile} hiddenFrom="sm" size="sm" />
                        <Burger opened={desktopOpened} onClick={toggleDesktop} visibleFrom="sm" size="sm" />
                        <Image src={logo} alt="HPC4AI" height={40} priority style={{ margin: '0 0 0 15px' }} />
                    </Group>
                    <Group>
                        <LogoutButton />
                    </Group>
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