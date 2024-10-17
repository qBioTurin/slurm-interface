'use client';

import { useState } from 'react';
import { TextInput, Switch, Group, rem } from '@mantine/core';
import styles from './Nodes.module.css';
import { IconSearch } from '@tabler/icons-react';
import NodesTable from '../../components/nodes/NodesTable';
import { Node } from '../../../../utils/models/models';
import { mockNodes } from '../../../../utils/models/mock';
import FloatingButton from '../../components/nodes/FloatingButton';

export default function NodesPage() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showIdleOnly, setShowIdleOnly] = useState<boolean>(false);
  const [nodes, setNodes] = useState<Node[]>(mockNodes);

  const filteredNodes = nodes.filter((node) => {
    const matchSearch = node.nodeName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchFilter = !showIdleOnly || node.state === 'IDLE';
    return matchSearch && matchFilter;
  });

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
