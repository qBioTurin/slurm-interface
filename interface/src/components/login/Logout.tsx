"use client"
import federatedLogout from "@/utils/federatedLogout";
import { IconLogout } from "@tabler/icons-react";
import { ActionIcon } from "@mantine/core";

export default function LogoutButton() {
    return <ActionIcon variant='subtle' onClick={() => federatedLogout()} size='xl' mr='lg'>
        <IconLogout />
    </ActionIcon>
}
