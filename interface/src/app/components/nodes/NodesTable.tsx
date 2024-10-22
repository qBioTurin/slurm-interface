import { Table, Badge, Button } from '@mantine/core';
import styles from './NodesTable.module.css';
import { z } from 'zod';
import { NodeSchema } from '../../schemas/node_schema';

type Node = z.infer<typeof NodeSchema>;

interface NodeTableProps {
  nodes: Node[];
}

export default function NodesTable({nodes}: NodeTableProps) {
  return (
    <Table className={styles.table} striped highlightOnHover>
      <thead>
        <tr>
          <th>Node Name</th>
          <th>Architecture</th>
          <th>State</th>
          <th>CPU</th>
          <th>Memory</th>
          <th>GPU</th>
          <th>Reason</th>
        </tr>
      </thead>
      <tbody>
        {nodes.length > 0 ? (
          nodes.map((node) => (
            <tr key={node.name}>
              <td>{node.name}</td>
              <td>{node.architecture}</td>
              <td>
                <Badge
                  color={
                    node.state[0] === 'IDLE'
                      ? 'green'
                      : node.state[0] === 'ALLOCATED'
                      ? 'blue'
                      : node.state[0] === 'DOWN'
                      ? 'red'
                      : 'yellow'
                  }
                >
                  {node.state}
                </Badge>
              </td>

              <td>
              <div>
                  <strong>Load:</strong> {node.cpu_load.toFixed(2)} <br />
                  <strong>Allocated:</strong> {node.alloc_cpus} <br />
                  <strong>Idle:</strong> {node.alloc_idle_cpus} <br />
                  <strong>Total:</strong> {node.effective_cpus}
                </div>
              </td>

              <td>
                <div>
                  <strong>Available:</strong> {} MB <br />
                  <strong>Total:</strong> {node.real_memory} MB
                </div>
              </td>

              <td>
                {node.gpu_spec === 'N/A' ? (
                  'N/A'
                ) : (
                  <div>
                    <strong>Idle:</strong> {} <br />
                    <strong>Total:</strong> {}
                  </div>
                )}
              </td>

              <td>{node.reason || 'N/A'}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={7} className={styles.noNodes}>
              No nodes found
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  );
}
