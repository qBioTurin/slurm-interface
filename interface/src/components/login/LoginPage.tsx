'use client'


import { Grid, Flex, rem, Card, AppShell, Container, Space, Stack, Group, BackgroundImage } from '@mantine/core';
import { LoginForm } from '@/components';
import Image from "next/image";
import logo from "@/assets/logo_hpc4ai.png"
import backgroundImage from '@/assets/geometric-maroon-black-red-abstract-art-9zqxwgd44bincdvl.jpg';



export default function LoginPage() {
    const containerStyle = {
        width: '100vw',
        height: '100vh',
        backgroundImage: `url(${backgroundImage})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
    }


    return (
        // <AppShell header={{ height: 100 }}>
        //     <AppShell.Header>
        //         <Group justify='center' align='center' px='lg'>
        //             <Image src={logo} alt="HPC4AI" height={70} />
        //         </Group>
        //     </AppShell.Header>

        //     <AppShell.Main >
        <div className="container" style={containerStyle} >
            <Container fluid bg='#eeeeee' h='100vh' style={{ width: '100' }}>
                <Space h="150" />
                <Stack justify='center' align='center'>
                    <LoginForm />
                </Stack>
            </Container>
        </div >
        //     </AppShell.Main>
        // </AppShell>
    );
}