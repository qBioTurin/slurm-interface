'use client';

import { useState } from 'react';
import { TextInput, Button, Switch, Table, Group, Badge, Flex, rem } from '@mantine/core';
import styles from './Reservations.module.css';

import ReservationsTableSort from '@/app/components/reservations/ReservationsTable';





export default function ReservationsPage() {
    return (
        <ReservationsTableSort />
    );
}