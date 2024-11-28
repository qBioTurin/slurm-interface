import { Container, Stack, BackgroundImage } from '@mantine/core';
import { LoginForm } from '@/components';
import backgroundImage from '@/assets/geometric-maroon-black-red-abstract-art.jpg';

export default function LoginPage() {
    return (
        <BackgroundImage src={backgroundImage.src} style={{ width: '100vw', height: '100vh' }}>
            <Container fluid h='100vh' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Stack justify='center' align='center'>
                    <LoginForm />
                </Stack>
            </Container>
        </BackgroundImage>
    );
}