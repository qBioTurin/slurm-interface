'use client';

import { useState } from 'react';
import { TextInput, Button, Switch, Table, Group, Badge, Flex } from '@mantine/core';
import styles from './NodeList.module.css';

interface Node {
    NodeID: string;
    State: 'Idle' | 'Allocated' | 'Down' | 'Maintenance';
    reserved: boolean;
}

const mockNodes: Node[] = [
    { NodeID: 'node1', State: 'Idle', reserved: false },
    { NodeID: 'node2', State: 'Allocated', reserved: true },
    { NodeID: 'node3', State: 'Down', reserved: false },
    { NodeID: 'node4', State: 'Maintenance', reserved: false },
]

export default function NodesPage() {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [showIdleOnly, setShowIdleOnly] = useState<boolean>(false);
    const [nodes, setNodes] = useState<Node[]>(mockNodes);

    const filteredNodes = nodes.filter((node) => {
        const matchSearch = node.NodeID.toLowerCase().includes(searchQuery.toLowerCase());
        const matchFilter = !showIdleOnly || node.State === 'Idle';
        return matchSearch && matchFilter;
    }
    );

    const handleReserve = (nodeID: string): void => {
        setNodes((prevNodes) =>
            prevNodes.map((node) =>
                node.NodeID === nodeID ? { ...node, reserved: !node.reserved } : node
            )
        );
    };

    return (
        <div className={styles.container}>
            <Group className={styles.controls}>
                <TextInput
                    className={styles.searchInput}
                    placeholder='SearchNodes by NodeID'
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.currentTarget.value)}
                />
                <div className={styles.switch}>
                    <Switch
                        label="Show idle nodes only"
                        checked={showIdleOnly}
                        onChange={(event) => setShowIdleOnly(event.currentTarget.checked)}
                    />
                </div>
            </Group>

            <Table className={styles.table} striped highlightOnHover>
                <thead>
                    <tr>
                        <th>NodeID</th>
                        <th>State</th>
                        <th>Reserve</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredNodes.length > 0 ? (
                        filteredNodes.map((node) => (
                            <tr key={node.NodeID}>
                                <td>{node.NodeID}</td>
                                <td>
                                    <Badge color={
                                        node.State === 'Idle'
                                            ? 'green'
                                            : node.State === 'Allocated'
                                                ? 'blue'
                                                : node.State === 'Down'
                                                    ? 'red'
                                                    : 'yellow'
                                    } >
                                        {node.State}
                                    </Badge>
                                </td>
                                <td>
                                    <Button
                                        variant={node.reserved ? 'outline' : 'filled'}
                                        color={node.reserved ? 'gray' : 'blue'}
                                        onClick={() => handleReserve(node.NodeID)}
                                    >
                                        {node.reserved ? 'Reserved' : 'Reserve'}
                                    </Button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={3} className={styles.noNodes}>
                                No nodes found
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </div>

    );

}