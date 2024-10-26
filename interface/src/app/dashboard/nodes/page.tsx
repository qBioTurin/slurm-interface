'use client';

import { useState, useEffect } from 'react';
import { TextInput, Switch, Group, rem, Button, Text, SegmentedControl } from '@mantine/core';
import styles from './Nodes.module.css';
import { IconSearch, IconServer } from '@tabler/icons-react';
import NodesTable from '../../components/nodes/NodesTable';
import { useFetchData } from '@/hooks/useFetchData';
import { SlurmNodeResponseSchema, NodeSchema } from '../../schemas/node_schema';
import LoadingPage from '@/components/LoadingPage/loadingPage';
import { z } from 'zod';
import { fromError } from 'zod-validation-error';
import { Accordion } from '@mantine/core';

type Node = z.infer<typeof NodeSchema>;

export default function NodesPage() {
  const [searchQuery, setSearchQuery] = useState<string>(''); // search bar
  const [showIdleOnly, setShowIdleOnly] = useState<boolean>(false); // switch state
  const [nodes, setNodes] = useState<Node[]>([]); // fetched nodes
  const [loading, setLoading] = useState(false); // page state
  const [selectedNodes, setSelectedNodes] = useState<string[]>([]);
  const [nodeStateFilter, setNodeStateFilter] = useState<string>('ALL');
  const { data, error } = useFetchData('nodes', SlurmNodeResponseSchema);

  useEffect(() => {
    setLoading(true);
    if (data) {
      setNodes(data);
    }
    setLoading(false);
  }
    , [data]);

  const filteredNodes = nodes.filter((node) => {
    const matchSearch = node.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchFilter = !showIdleOnly || (node.state?.[0] ?? '') === 'IDLE';
    if (nodeStateFilter === 'ALL') {
      return matchSearch && matchFilter;
    }
    const matchState = !nodeStateFilter || node.state.includes(nodeStateFilter);
    return matchSearch && matchFilter && matchState;
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

  const nodesByPartition: Record<string, Node[]> = filteredNodes.reduce((record, node) => {
    if (node.partitions) {
      node.partitions.forEach((partition) => {
        if (!partition.includes('-booked')) { // Exclude partitions containing a tick
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
    return <div>Error: {error}</div>;
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
          {/* <div className={styles.switch}>
            <Switch
              label="Show idle nodes only"
              checked={showIdleOnly}
              onChange={(event) => setShowIdleOnly(event.currentTarget.checked)}
            />
          </div> */}
          <Group>
            <Text size="sm" fw={500}>
              Filter by state:
            </Text>
            <SegmentedControl
              data={[
                { value: 'ALL', label: 'All' },
                { value: 'IDLE', label: 'Idle' },
                { value: 'ALLOCATED', label: 'Allocated' },
                { value: 'DOWN', label: 'Down' },
                { value: 'MIXED', label: 'Mixed' },
              ]}
              value={nodeStateFilter}
              onChange={setNodeStateFilter}
            />
          </Group>

        </Group>

        {selectedNodes.length > 0 && (
          <Group justify='flex-end'>
            <Button onClick={() => setSelectedNodes([])} variant='outline'>Clear selection</Button>
            {selectedNodes.length == 1 && (<Button>Reserve {selectedNodes.length}  node</Button>)}
            {selectedNodes.length > 1 && (<Button>Reserve {selectedNodes.length}  nodes</Button>)}
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
