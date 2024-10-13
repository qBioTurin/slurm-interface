import { Table, Badge, Button } from '@mantine/core';
import styles from './NodeList.module.css';
import { Node } from '../../../../utils/models/models';

interface NodeTableProps {
  nodes: Node[];
  onReserve: (nodeID: string) => void;
}

export default function NodeTable({ nodes, onReserve }: NodeTableProps) {
  return (
    <Table className={styles.table} striped highlightOnHover>
      <thead>
        <tr>
          <th>NodeID</th>
          <th>State</th>
          <th>Reserve</th>
        </tr>
      </thead>
      <tbody>
        {nodes.length > 0 ? (
          nodes.map((node) => (
            <tr key={node.NodeID}>
              <td>{node.NodeID}</td>
              <td>
                <Badge
                  color={
                    node.State === 'Idle'
                      ? 'green'
                      : node.State === 'Allocated'
                      ? 'blue'
                      : node.State === 'Down'
                      ? 'red'
                      : 'yellow'
                  }
                >
                  {node.State}
                </Badge>
              </td>
              <td>
                <Button
                  variant={node.reserved ? 'outline' : 'filled'}
                  color={node.reserved ? 'gray' : 'blue'}
                  onClick={() => onReserve(node.NodeID)}
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
  );
}
