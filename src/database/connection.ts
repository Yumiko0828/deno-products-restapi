import { MongoClient } from "mongo";
import { MONGODB } from "../config/config.ts";
import { MongoConnectionError } from "../utils/errors.ts";

const client = new MongoClient();

const db = await client.connect(MONGODB.URI).catch((e) => {
  throw new MongoConnectionError(e);
});

console.log(`MongoDB: Connected to ${db.name}`);

export { db };
