"use client"

import { IconLogout } from "@tabler/icons-react";
import { ActionIcon } from "@mantine/core";
import { signOut } from "next-auth/react"

export async function federatedLogout() {
    try {
        const response = await fetch(`${process.env.NEXTAUTH_URL}/api/auth/federated-logout`);
        const data = await response.json();
        if (response.ok) {
            await signOut({ redirect: false });
            window.location.href = data.url;
            return;
        }
        throw new Error(data.error);
    } catch (error) {
        console.log(error);
        // alert(error);
        await signOut({ redirect: false });
        window.location.href = "/";
    }
}


export default function LogoutButton() {
    return <ActionIcon variant='subtle' onClick={() => federatedLogout()} size='xl' mr='lg'>
        <IconLogout />
    </ActionIcon>
}
