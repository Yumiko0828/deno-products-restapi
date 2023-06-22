import { db } from "./connection.ts";
import { ProductSchema } from "./schemas.ts";

export const productsCollection = db.collection<ProductSchema>("products");
