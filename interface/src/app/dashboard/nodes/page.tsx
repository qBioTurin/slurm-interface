'use client';

import { useState, useEffect} from 'react';
import { TextInput, Switch, Group, rem } from '@mantine/core';
import styles from './Nodes.module.css';
import { IconSearch } from '@tabler/icons-react';
import NodesTable from '../../components/nodes/NodesTable';
import { useSlurmData } from '@/hooks/useSlurmData';
import {SlurmNodeResponseSchema, NodeSchema } from '../../schemas/node_schema';
import LoadingPage from '@/components/LoadingPage/loadingPage';
import { z } from 'zod';
import { fromError } from 'zod-validation-error';

type Node = z.infer<typeof NodeSchema>;

export default function NodesPage() {
  const [searchQuery, setSearchQuery] = useState<string>(''); // search bar
  const [showIdleOnly, setShowIdleOnly] = useState<boolean>(false); // switch state
  const [nodes, setNodes] = useState<Node[]>([]); // fetched nodes
  const [isValidating, setIsValidating] = useState(false); // page state

  const { data, loading, error } = useSlurmData('nodes');

  useEffect(() => { 
    if (error) {
        return;
    }

    if (loading) {
        return;
    }

    if (data) {
        setIsValidating(true);
        try {
            const validatedData = SlurmNodeResponseSchema.parse(data);
            const validatedNodes = validatedData.nodes;
            if (validatedNodes) {
                setNodes(validatedNodes);
            } else {
                console.warn("Validated nodes are undefined, skipping setNodes.");
            }
        } catch (error) {
            const validationError = fromError(error);
            console.error('Error validating node data:', validationError.toString());
            setNodes([]);
        } finally {
            setIsValidating(false);
        }
    } else {
        console.warn("Data is null or undefined, skipping validation.");
    }
  }, [data, loading]);

  const filteredNodes = nodes.filter((node) => {
    const matchSearch = node.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchFilter = !showIdleOnly || (node.state?.[0] ?? '') === 'IDLE';
    return matchSearch && matchFilter;
  });

  if (loading || isValidating) {
    return <LoadingPage />;
}

  return (
    <div className={styles.container}>
      <Group className={styles.group}>
        <TextInput
          className={styles.searchInput}
          placeholder="Search nodes by name"
          leftSection={<IconSearch style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}

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

      <NodesTable nodes={filteredNodes} />

    </div>
  );
}
