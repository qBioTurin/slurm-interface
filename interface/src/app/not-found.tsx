import Link from 'next/link'
import { Shell } from '@/components'
import { Button, Flex, Title } from '@mantine/core'
import errorImage from "@/assets/404error.jpg"
import Image from "next/image";

export default function NotFound() {
    return (
        <Shell>
            <Flex direction='column' align='center' justify='center' style={{ height: '80vh' }} gap='md'>
                <Image src={errorImage} alt="404 Error" width={450} height={450} />
                <Title mb='md' order={2} style={{ textAlign: 'center' }} >Sorry! We can't seem to find the page you're looking for.</Title>
                <Button component={Link} href="/dashboard" variant="light">Go back to dashboard</Button>
            </Flex>
        </Shell >
    )
}