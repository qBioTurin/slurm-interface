'use client';

import { useState } from 'react';
import { TextInput, Switch, Group } from '@mantine/core';
import styles from '../../components/nodes/NodeList.module.css';
import NodeTable from '../../components/nodes/NodesTable';
import { Node } from '../../../../utils/models/models';
import { mockNodes } from '../../../../utils/models/mock';

export default function NodesPage() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showIdleOnly, setShowIdleOnly] = useState<boolean>(false);
  const [nodes, setNodes] = useState<Node[]>(mockNodes);

  const filteredNodes = nodes.filter((node) => {
    const matchSearch = node.NodeID.toLowerCase().includes(searchQuery.toLowerCase());
    const matchFilter = !showIdleOnly || node.State === 'Idle';
    return matchSearch && matchFilter;
  });

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
          placeholder="SearchNodes by NodeID"
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

      <NodeTable nodes={filteredNodes} onReserve={handleReserve} />
    </div>
  );
}
