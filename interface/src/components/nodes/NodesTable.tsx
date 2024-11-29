import { Table, Checkbox } from '@mantine/core';
import styles from './NodesTable.module.css';
import { z } from 'zod';
import { NodeSchema } from '../../schemas/node_schema';
import NodeStateBadge from './NodeStateBadge';

type Node = z.infer<typeof NodeSchema>;

interface NodeTableProps {
  nodes: Node[];
  selectedNodes: string[];
  onNodeSelect: (nodeName: string, isSelected: boolean) => void;
  onSelectAll: (isSelected: boolean) => void;
}

export default function NodesTable({ nodes, selectedNodes, onNodeSelect, onSelectAll }: NodeTableProps) {
  const allSelected = nodes.every((node) => selectedNodes.includes(node.name));
  const someSelected = nodes.some((node) => selectedNodes.includes(node.name));

  return (
    <Table className={styles.table} striped highlightOnHover>
      <thead>
        <tr>
          <th>
            <Checkbox
              size='md'
              checked={allSelected}
              indeterminate={!allSelected && someSelected}
              onChange={(event) => onSelectAll(event.currentTarget.checked)}
            />
          </th>
          <th>Node Name</th>
          <th>Architecture</th>
          <th>State</th>
          <th>CPU</th>
          <th>Memory</th>
        </tr>
      </thead>
      <tbody>
        {nodes.length > 0 ? (
          nodes.map((node) => (
            <tr key={node.name}>
              <td>
                <Checkbox
                  size='md'
                  checked={selectedNodes.includes(node.name)}
                  onChange={(event) => onNodeSelect(node.name, event.currentTarget.checked)}
                />
              </td>
              <td>{node.name}</td>
              <td>{node.architecture}</td>
                <td>
                <NodeStateBadge state={node.state[0]} />
                {node.state[1] && <span style={{ paddingLeft: '2px' }}><NodeStateBadge state={node.state[1]} /></span>}
                </td>

              <td>
                <div>
                  <strong className={styles.boldText}>Load:</strong> {node.cpu_load.toFixed(2)} <br />
                  <strong className={styles.boldText}>Allocated:</strong> {node.alloc_cpus} <br />
                  <strong className={styles.boldText}>Idle:</strong> {node.alloc_idle_cpus} <br />
                  <strong className={styles.boldText}>Total:</strong> {node.cpus}
                </div>
              </td>

              <td>
                <div>
                  <strong className={styles.boldText}>Available:</strong> {(node.free_mem.number / 1024).toFixed(2)} GB <br />
                  <strong className={styles.boldText}>Total:</strong> {((node.real_memory ?? 0) / 1024).toFixed(2)} GB
                </div>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={8} className={styles.noNodes}>
              No nodes found
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  );
}

function getGpuInfo(node: Node) {
  let gpuTotal = 0;
  let gpuIdle = 0;
  if (node.gpu_spec) {
    const gpuSpec = node.gpu_spec.match(/gpu:(\d+)/);
    gpuTotal = gpuSpec ? parseInt(gpuSpec[1], 10) : 0;
    gpuIdle = gpuTotal - (Number(node.gres_used) || 0) - (Number(node.gres_drained) || 0);
  }

  return [gpuTotal, gpuIdle];
}
