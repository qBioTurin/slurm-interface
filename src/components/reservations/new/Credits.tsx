import React, { useState } from 'react';
import { Card, Button, Modal, Text, Group, Tooltip } from '@mantine/core';
import { IconInfoCircle } from '@tabler/icons-react';

interface CreditProps {
    userCredits: number;
    durationMinutes: number;
    onInsufficientCredits: (hasInsufficientCredits: boolean) => void;
}

const pricingData = [
    { partition: 'cascadelake', cpm: 0.0292 },
    { partition: 'epito', cpm: 0.0385 },
    { partition: 'broadwell', cpm: 0.0047 },
    { partition: 'gracehopper', cpm: 0.042 }
];

const calculateCreditsNeeded = (duration: number, cpm: number) => duration * cpm;

const Credit: React.FC<CreditProps> = ({ userCredits, durationMinutes, onInsufficientCredits }) => {
    const [modalOpened, setModalOpened] = useState(false);
    const selectedPartitionCost = pricingData[0].cpm;
    const creditsNeeded = calculateCreditsNeeded(durationMinutes, selectedPartitionCost);

    onInsufficientCredits(userCredits < creditsNeeded);

    return (
        <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Group>
                <Text>Current Credits: {userCredits.toFixed(2)}</Text>
                <Tooltip label="View pricing list" withArrow>
                    <Button variant="subtle" size="xs" onClick={() => setModalOpened(true)}>
                        <IconInfoCircle size={20} />
                    </Button>
                </Tooltip>
            </Group>
            <Text mt="sm">
                Credits Required: {creditsNeeded.toFixed(2)} 
            </Text>
            <Text color={userCredits >= creditsNeeded ? "green" : "red"}>
                Credits After Reservation: {(userCredits - creditsNeeded).toFixed(2)}
            </Text>

            <Modal opened={modalOpened} onClose={() => setModalOpened(false)} title="Pricing List">
                {pricingData.map((item) => (
                    <Text key={item.partition}>{`${item.partition}: ${item.cpm.toFixed(4)} per minute`}</Text>
                ))}
            </Modal>
        </Card>
    );
};

export default Credit;
