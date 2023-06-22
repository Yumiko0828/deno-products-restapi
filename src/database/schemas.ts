import { ObjectId } from "mongo";

export interface ProductSchema {
  _id: ObjectId;
  name: string;
  description?: string;
  price: number;
  stock: number;
  createdAt: Date;
  updatedAt: Date;
}
