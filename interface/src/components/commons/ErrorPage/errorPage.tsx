import { Flex, Title, Text, Stack } from "@mantine/core";
import Image from "next/image";
import serverError from "@/assets/serverError.png";

interface ErrorPageProps {
    error: string;
}

export default function ErrorPage({ error }: ErrorPageProps) {
    return (
        <Flex direction={{ base: 'column', md: 'row' }} align="center" justify="center" style={{ height: '70vh' }} >
            <div style={{ width: '100%', maxWidth: '400px' }}>
                <Image src={serverError} alt="Error" layout="responsive" width={500} />
            </div>
            <Stack >
                <Title order={1} style={{ textAlign: 'center' }} >Sorry!</Title><Title order={3} style={{ textAlign: 'center' }}> Something went wrong on our end.</Title>
                <Text style={{ textAlign: 'center' }}>Please refresh the page or try again later.</Text>
            </Stack>

        </Flex>
    );
}