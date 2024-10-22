import { z } from 'zod';
import { NumberSetInfiniteSchema, SlurmSchema, PluginSchema, ClientSchema, MetaSchema, SignalSchema, ExitCodeSchema, WarningsSchema, ErrorsSchema } from './common_schema';



/*JSON to be parsed: 

{
  "reservations" : [ {
    "end_time" : {
      "number" : 6,
      "set" : true,
      "infinite" : true
    },
    "flags" : [ "MAINT", "MAINT" ],
    "groups" : "groups",
    "users" : "users",
    "max_start_delay" : 1,
    "features" : "features",
    "start_time" : {
      "number" : 2,
      "set" : true,
      "infinite" : true
    },
    "burst_buffer" : "burst_buffer",
    "licenses" : "licenses",
    "partition" : "partition",
    "watts" : {
      "number" : 7,
      "set" : true,
      "infinite" : true
    },
    "core_specializations" : [ {
      "node" : "node",
      "core" : "core"
    }, {
      "node" : "node",
      "core" : "core"
    } ],
    "name" : "name",
    "tres" : "tres",
    "accounts" : "accounts",
    "node_count" : 5,
    "node_list" : "node_list",
    "purge_completed" : {
      "time" : {
        "number" : 5,
        "set" : true,
        "infinite" : true
      }
    },
    "core_count" : 0
  }, {
    "end_time" : {
      "number" : 6,
      "set" : true,
      "infinite" : true
    },
    "flags" : [ "MAINT", "MAINT" ],
    "groups" : "groups",
    "users" : "users",
    "max_start_delay" : 1,
    "features" : "features",
    "start_time" : {
      "number" : 2,
      "set" : true,
      "infinite" : true
    },
    "burst_buffer" : "burst_buffer",
    "licenses" : "licenses",
    "partition" : "partition",
    "watts" : {
      "number" : 7,
      "set" : true,
      "infinite" : true
    },
    "core_specializations" : [ {
      "node" : "node",
      "core" : "core"
    }, {
      "node" : "node",
      "core" : "core"
    } ],
    "name" : "name",
    "tres" : "tres",
    "accounts" : "accounts",
    "node_count" : 5,
    "node_list" : "node_list",
    "purge_completed" : {
      "time" : {
        "number" : 5,
        "set" : true,
        "infinite" : true
      }
    },
    "core_count" : 0
  } ],
  "meta" : {
    "slurm" : {
      "cluster" : "cluster",
      "release" : "release",
      "version" : {
        "major" : "major",
        "minor" : "minor",
        "micro" : "micro"
      }
    },
    "plugin" : {
      "accounting_storage" : "accounting_storage",
      "name" : "name",
      "type" : "type",
      "data_parser" : "data_parser"
    },
    "client" : {
      "source" : "source",
      "user" : "user",
      "group" : "group"
    },
    "command" : [ "command", "command" ]
  },
  "last_update" : {
    "number" : 9,
    "set" : true,
    "infinite" : true
  },
  "warnings" : [ {
    "description" : "description",
    "source" : "source"
  }, {
    "description" : "description",
    "source" : "source"
  } ],
  "errors" : [ {
    "description" : "description",
    "source" : "source",
    "error" : "error",
    "error_number" : 5
  }, {
    "description" : "description",
    "source" : "source",
    "error" : "error",
    "error_number" : 5
  } ]
}

*/

export const CoreSpecializationSchema = z.object({
    node: z.string(),
    core: z.string(),
});

export const PurgeCompletedSchema = z.object({
    time: NumberSetInfiniteSchema
});

export const ReservationSchema = z.object({
    end_time: NumberSetInfiniteSchema,
    flags: z.array(z.string()),
    groups: z.string(),
    users: z.string(),
    max_start_delay: z.number(),
    features: z.string(),
    start_time: NumberSetInfiniteSchema,
    burst_buffer: z.string(),
    licenses: z.string(),
    partition: z.string(),
    watts: NumberSetInfiniteSchema,
    core_specializations: z.array(CoreSpecializationSchema),
    name: z.string(),
    tres: z.string(),
    accounts: z.string(),
    node_count: z.number(),
    node_list: z.string(),
    purge_completed: PurgeCompletedSchema,
    core_count: z.number(),
});

export const SlurmReservationResponseSchema = z.object({
    reservations: z.array(ReservationSchema),
    meta: MetaSchema.optional(),
    last_update: NumberSetInfiniteSchema.optional(),
    warnings: z.array(WarningsSchema).optional(),
    errors: z.array(ErrorsSchema).optional(),
});


