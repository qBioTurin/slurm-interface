'use client'

import { IconBrandFacebook, IconBrandLinkedin, IconBrandTwitter, IconMapPin, IconMail } from '@tabler/icons-react';
import { ActionIcon, Container, Group, Text, Flex, Stack } from '@mantine/core';
import classes from './footer.module.css';
import Image from "next/image";
import hpc4ai from "@/assets/logo_hpc4ai.png";
import qbio from "@/assets/qbio.png";
import unito from "@/assets/UniTo.png";
import regPiem from "@/assets/logo_RegPiem.jpg";
import porPiemFESR from "@/assets/POR_Piem_FESR_14_20.jpg";

const contacts = [
    {
        title: 'Contacts',
        links: [
            { icon: <IconMapPin />, label: 'Corso Svizzera 185, 10149, Turin', link: 'https://maps.app.goo.gl/7YNWoG9JgPDix2ov5' },
            { icon: <IconMail />, label: 'support@hpc4ai.unito.it', link: 'mailto:support@hpc4ai.unito.it' },
        ],
    },
];

export default function Footer() {

    const groupContacts = contacts.map((group, groupIndex) => {
        const links = group.links.map((link, index) => (
            <Group key={index}>
                <ActionIcon size="lg" color="gray" variant="subtle" onClick={
                    () => window.open(link.link, '_blank')
                }>
                    {link.icon}
                </ActionIcon>
                <Text<'a'>
                    className={classes.link}
                    component="a"
                    href={link.link}
                    target='_blank'
                    rel='noopener noreferrer'
                >
                    {link.label}
                </Text>
            </Group>
        ));

        return (
            <div className={classes.wrapper} key={groupIndex}>
                <Text className={classes.title}>{group.title}</Text>
                {links}
            </div>
        );
    });

    const heightLogo = 45;

    return (
        <footer className={classes.footer}>
            <Container className={classes.inner}>
                <Flex direction='row' justify='center' align='center' wrap='wrap'>
                    <Stack align='flex-start' className={classes.contacts} p='lg'>
                        {groupContacts}
                    </Stack>
                    <Image src={regPiem} alt="Regione piemonte" height={heightLogo} style={{ margin: '30px  0 0 15px' }} />
                    <Image src={porPiemFESR} alt="POR Piemonte FESR 14-20" height={heightLogo} style={{ margin: '30px  0 0 15px' }} />
                    <Image src={unito} alt="UniTo" height={heightLogo} style={{ margin: '30px  0 0 15px' }} />
                    <Image src={qbio} alt="qBio Logo" height={heightLogo} style={{ margin: '30px 0 0 15px' }} />
                    <Image src={hpc4ai} alt="HPC4AI" height={heightLogo} style={{ margin: '30px 0 0 15px' }} />
                </Flex>
            </Container>
            <Container className={classes.afterFooter}>
                <Text c="dimmed" size="sm" ml='sm'>
                    © 2024 HPC4AI. All rights reserved.
                </Text>

                <Group gap={0} className={classes.social} justify="flex-end" wrap="nowrap">
                    <ActionIcon size="lg" color="gray" variant="subtle" onClick={
                        () => window.open('https://www.facebook.com/hpc4ai/', '_blank')
                    }>
                        <IconBrandFacebook size={18} stroke={1.5} />
                    </ActionIcon>
                    <ActionIcon size="lg" color="gray" variant="subtle">
                        <IconBrandTwitter size={18} stroke={1.5} onClick={
                            () => window.open('https://twitter.com/hpc4ai_it', '_blank')
                        } />
                    </ActionIcon>
                    <ActionIcon size="lg" color="gray" variant="subtle" onClick={
                        () => window.open('https://www.linkedin.com/showcase/hpc4ai/about/', '_blank')
                    }>
                        <IconBrandLinkedin size={18} stroke={1.5} />
                    </ActionIcon>
                </Group>
            </Container >
        </footer >
    );
}