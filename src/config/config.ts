import { config } from "dotenv";
config({
  export: true,
});

const MONGODB = {
  URI: Deno.env.get("MONGODB_URI") as string,
};

export { MONGODB };
