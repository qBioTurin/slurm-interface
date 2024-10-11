'use client';

import { Burger, Group } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { MantineLogo } from '@mantinex/mantine-logo'

export default function BaconBurger() {
    const [opened, { toggle }] = useDisclosure();

    return (
        <Group h="100%" px="md">
            <Burger
                opened={opened}
                onClick={toggle}
                hiddenFrom="sm"
                size="sm"
            />
            <MantineLogo size={30} />
        </Group>

    )
}