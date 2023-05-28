// Generated by Xata Codegen 0.23.5. Please do not edit.
import { buildClient } from "@xata.io/client";
import type {
  BaseClientOptions,
  SchemaInference,
  XataRecord,
} from "@xata.io/client";

const tables = [
  {
    name: "info",
    columns: [
      { name: "title", type: "string" },
      { name: "number_of_views", type: "string" },
      { name: "video_length", type: "string" },
      { name: "thumbnail_url", type: "string" },
      { name: "ratings", type: "string" },
      { name: "transcription_status", type: "string" },
    ],
  },
] as const;

export type SchemaTables = typeof tables;
export type InferredTypes = SchemaInference<SchemaTables>;

export type Info = InferredTypes["info"];
export type InfoRecord = Info & XataRecord;

export type DatabaseSchema = {
  info: InfoRecord;
};

const DatabaseClient = buildClient();

const defaultOptions = {
  databaseURL: "https://satish-s-workspace-6midd6.us-east-1.xata.sh/db/listenr",
};

export class XataClient extends DatabaseClient<DatabaseSchema> {
  constructor(options?: BaseClientOptions) {
    super({ ...defaultOptions, ...options }, tables);
  }
}

let instance: XataClient | undefined = undefined;

export const getXataClient = () => {
  if (instance) return instance;

  instance = new XataClient();
  return instance;
};