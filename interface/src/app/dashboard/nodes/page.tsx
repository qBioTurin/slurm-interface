'use client';

import { useState, useEffect } from 'react';
import styles from './Nodes.module.css';
import { Accordion, TextInput, Group, rem, Button, Text, SegmentedControl } from '@mantine/core';
import { IconCalendar, IconPlayerPlay, IconSearch, IconServer } from '@tabler/icons-react';
import { useFetchData } from '@/hooks';
import { SlurmNodeResponseSchema, NodeSchema } from '@/schemas/node_schema';
import { ErrorPage, LoadingPage, NodesTable } from '@/components';
import { z } from 'zod';
import { useRouter } from 'next/navigation';

type Node = z.infer<typeof NodeSchema>;

export default function NodesPage() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [nodes, setNodes] = useState<Node[]>([]);
  const [selectedNodes, setSelectedNodes] = useState<string[]>([]);
  const [nodeStateFilter, setNodeStateFilter] = useState<string>('ALL');
  const { data, loading, error } = useFetchData('nodes', SlurmNodeResponseSchema);
  const router = useRouter();

  useEffect(() => {
    if (data) {
      setNodes(data);
    }
  }, [data]);

  const filteredNodes = nodes.filter((node) => {
    const matchSearch = node.name.toLowerCase().includes(searchQuery.toLowerCase());

    if (nodeStateFilter === 'ALL') {
      return matchSearch;
    }
    const matchState = !nodeStateFilter || node.state.includes(nodeStateFilter);
    return matchSearch && matchState;
  });

  const handleNodeSelect = (nodeName: string, isSelected: boolean) => {
    setSelectedNodes((prevSelectedNodes) =>
      isSelected ? [...prevSelectedNodes, nodeName] : prevSelectedNodes.filter((name) => name !== nodeName)
    );
  };

  const handleSelectAll = (partition: string, isSelected: boolean) => {
    const partitionNodes = nodesByPartition[partition].map((node) => node.name);
    setSelectedNodes((prevSelectedNodes) =>
      isSelected
        ? [...prevSelectedNodes, ...partitionNodes.filter((node) => !prevSelectedNodes.includes(node))]
        : prevSelectedNodes.filter((node) => !partitionNodes.includes(node))
    );
  };

  const handleSubmitJobForNodes = () => {
    const query = selectedNodes.map((node) => `nodes=${encodeURIComponent(node)}`).join('&');
    console.log(query);
    router.push(`/dashboard/jobs/submit?${query}`);
  }

  const handleReserveNodes = () => {
    const query = selectedNodes.map((node) => `nodes=${encodeURIComponent(node)}`).join('&');
    router.push(`/dashboard/reservations/new?${query}`);
  }

  const nodesByPartition: Record<string, Node[]> = filteredNodes.reduce((record, node) => {
    if (node.partitions) {
      node.partitions.forEach((partition) => {
        if (!partition.includes('-booked')) { // Exclude partitions containing -booked
          if (!record[partition]) {
            record[partition] = [];
          }
          record[partition].push(node);
        }
      });
    }
    return record;
  }, {} as Record<string, Node[]>);

  if (loading) {
    return <LoadingPage />;
  }

  if (error) {
    return <ErrorPage error={error} />;
  }

  return (
    <div className={styles.container}>
      <Group className={styles.group} justify='space-between'>
        <Group>
          <TextInput
            className={styles.searchInput}
            placeholder="Search nodes by name"
            leftSection={<IconSearch style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}

            value={searchQuery}
            onChange={(event) => setSearchQuery(event.currentTarget.value)}
          />
          <Group>
            <SegmentedControl
              data={[
                { value: 'ALL', label: 'All' },
                { value: 'IDLE', label: 'Idle' },
                { value: 'ALLOCATED', label: 'Allocated' },
                { value: 'DOWN', label: 'Down' },
                { value: 'RESERVED', label: 'Reserved' },
              ]}
              value={nodeStateFilter}
              onChange={setNodeStateFilter}
            />
          </Group>

        </Group>

        {selectedNodes.length > 0 && (
          <Group justify='flex-end'>
            <Button onClick={() => setSelectedNodes([])} variant='outline'>Clear selection</Button>
            <Button onClick={handleSubmitJobForNodes}
              leftSection={<IconPlayerPlay style={{ width: rem(16), height: rem(16) }} />}
            >
              Run job(s)
              {/* {selectedNodes.length === 1 ? `Run job(s) on ${selectedNodes.length} node` : `Run jobs on ${selectedNodes.length} nodes`} */}
            </Button>
            <Button onClick={handleReserveNodes} variant="light"
              leftSection={<IconCalendar style={{ width: rem(16), height: rem(16) }} />}
            >
              {selectedNodes.length === 1 ? `Reserve ${selectedNodes.length} node` : `Reserve ${selectedNodes.length} nodes`}
            </Button>
          </Group>
        )}
      </Group>

      <Accordion multiple>
        <Text style={{ fontSize: rem(20), fontWeight: 500, marginBottom: rem(10) }}>Partitions
        </Text>
        {Object.entries(nodesByPartition).map(([partition, partitionNodes]) => (
          <Accordion.Item value={partition} key={partition}>
            <Accordion.Control>
              <Group>
                <IconServer style={{ width: rem(16), height: rem(16) }} />
                <Text style={{ fontWeight: 500 }}>{partition}</Text>
                <Text style={
                  {
                    color: 'var(--mantine-color-gray-6)',
                    fontSize: rem(14),
                    fontWeight: 500,

                  }}>({partitionNodes.length} nodes)</Text>
              </Group>
            </Accordion.Control>
            <Accordion.Panel>
              <NodesTable nodes={partitionNodes} selectedNodes={selectedNodes} onNodeSelect={handleNodeSelect} onSelectAll={(isSelected) => handleSelectAll(partition, isSelected)} />
            </Accordion.Panel>
          </Accordion.Item>
        ))}
      </Accordion>

    </div>
  );
}
