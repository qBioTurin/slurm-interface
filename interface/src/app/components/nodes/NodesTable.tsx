import { Table, Badge, Accordion, rem } from '@mantine/core';
import styles from './NodesTable.module.css';
import { z } from 'zod';
import { NodeSchema } from '../../schemas/node_schema';

type Node = z.infer<typeof NodeSchema>;

interface NodeTableProps {
  nodes: Node[];
}

export default function NodesTable({nodes}: NodeTableProps) {
  const nodesByPartition: Record<string, Node[]> = nodes.reduce((record, node) => {
    if (node.partitions) {
      node.partitions.forEach((partition) => {
        if (!record[partition]) {
          record[partition] = [];
        }
        record[partition].push(node);
      });
    }
    return record;
  }, {} as Record<string, Node[]>);

  return (
    <Accordion className={styles.accordion} multiple>
    {Object.entries(nodesByPartition).map(([partition, partitionNodes]) => (
      <Accordion.Item value={partition} key={partition}>
        <Accordion.Control>
          {partition} ({partitionNodes.length} nodes)
        </Accordion.Control>
        <Accordion.Panel>
          <Table className={styles.table} striped highlightOnHover>
            <thead>
              <tr>
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
                  <td colSpan={7} className={styles.noNodes}>
                    No nodes found
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Accordion.Panel>
      </Accordion.Item>
    ))}
  </Accordion>
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

  return [gpuTotal,gpuIdle];
}
