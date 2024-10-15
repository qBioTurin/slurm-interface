import { Table, Badge, Button } from '@mantine/core';
import styles from './NodesTable.module.css';
import { Node } from '../../../../utils/models/models';

interface NodeTableProps {
  nodes: Node[];
}

export default function NodesTable({nodes}: NodeTableProps) {
  return (
    <Table className={styles.table} striped highlightOnHover>
      <thead>
        <tr>
          <th>Node Name</th>
          <th>Account</th>
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
            <tr key={node.nodeName}>
              <td>{node.nodeName}</td>
              <td>{node.account}</td>
              <td>
                <Badge
                  color={
                    node.state === 'IDLE'
                      ? 'green'
                      : node.state === 'ALLOCATED'
                      ? 'blue'
                      : node.state === 'DOWN'
                      ? 'red'
                      : 'yellow'
                  }
                >
                  {node.state}
                </Badge>
              </td>

              <td>
              <div>
                  <strong>Load:</strong> {node.cpu.load.toFixed(2)} <br />
                  <strong>Allocated:</strong> {node.cpu.allocated} <br />
                  <strong>Idle:</strong> {node.cpu.idle} <br />
                  <strong>Total:</strong> {node.cpu.total}
                </div>
              </td>

              <td>
                <div>
                  <strong>Available:</strong> {node.memory.available} MB <br />
                  <strong>Total:</strong> {node.memory.total} MB
                </div>
              </td>

              <td>
                {node.gpu.idle === 'N/A' ? (
                  'N/A'
                ) : (
                  <div>
                    <strong>Idle:</strong> {node.gpu.idle} <br />
                    <strong>Total:</strong> {node.gpu.total}
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
