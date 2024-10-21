import { z } from 'zod';

export const NumberSetInfiniteSchema = z.object({
    number: z.number(),
    set: z.boolean(),
    infinite: z.boolean(),
  });

export const SlurmSchema = z.object({
    cluster: z.string(),
    release: z.string(),
    version: z.object({
      major: z.string(),
      minor: z.string(),
      micro: z.string(),
    }),
  });

export const PluginSchema = z.object({
    accounting_storage: z.string(),
    name: z.string(),
    type: z.string(),
    data_parser: z.string(),
  });

export const ClientSchema = z.object({
    source: z.string(),
    user: z.string(),
    group: z.string(),
  });

export const MetaSchema = z.object({
    plugin: PluginSchema,
    client: ClientSchema,
    command: z.array(z.string()),
    slurm: SlurmSchema,
  });

export const SignalSchema = z.object({
    name: z.string(),
    id: NumberSetInfiniteSchema,
  });

export const ExitCodeSchema = z.object({
    return_code: NumberSetInfiniteSchema,
    signal: SignalSchema,
    status: z.array(z.string()),
  });
  