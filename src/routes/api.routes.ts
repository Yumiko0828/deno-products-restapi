import { Router, Status } from "oak";
import { productsCollection } from "../database/collections.ts";
import { ObjectId } from "https://deno.land/x/mongo@v0.31.2/mod.ts";
const router = new Router({
  prefix: "/api",
});

interface ProductBody {
  name?: string;
  description?: string;
  price?: number;
  stock?: number;
}

// Get all products
router.get("/products", async ({ response: res }) => {
  const products = await productsCollection.find().toArray();

  res.body = products;
});

// Get a product by id
router.get("/products/:id", async ({ response: res, params }) => {
  if (params.id.length !== 24) {
    res.body = {
      message: "Invalid product id",
    };
    res.type = "json";
    res.status = Status.BadRequest;
    return;
  }

  const product = await productsCollection
    .findOne({
      _id: new ObjectId(params.id),
    })
    .catch(() => {});

  if (!product) {
    res.body = {
      message: "Product not found",
    };
    res.type = "json";
    res.status = Status.NotFound;
  } else {
    res.body = product;
  }
});

// Create a product
router.post("/products/new", async ({ request: req, response: res }) => {
  const data = (await req.body({ type: "json" }).value) as ProductBody | null;

  if (!data) {
    res.body = {
      message: "Missing properties in request body",
    };
    res.type = "json";
    res.status = Status.BadRequest;
    return;
  }

  if (!data.name || !data.description || !data.price || !data.stock) {
    res.body = {
      message: `Property '${
        !data.name
          ? "name"
          : !data.description
          ? "description"
          : !data.price
          ? "price"
          : "stock"
      }' is required`,
    };
    res.type = "json";
    res.status = Status.BadRequest;
    return;
  }

  const { name, description, price, stock } = data;

  if (typeof price !== "number" || typeof stock !== "number") {
    res.body = {
      message: `The ${
        typeof price !== "number" ? "price" : "stock"
      } must be a number.`,
    };
    res.type = "json";
    res.status = Status.BadRequest;
    return;
  }

  const id = await productsCollection.insertOne({
    name,
    description,
    price,
    stock,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  const product = await productsCollection.findOne({ _id: id });

  res.body = product;
});

// Update a product (by id)
router.put("/products/:id", async ({ request: req, response: res, params }) => {
  const data = req.body({ type: "json" }).value as ProductBody | null;

  if (params.id.length !== 24) {
    res.body = {
      message: "Invalid product id",
    };
    res.type = "json";
    res.status = Status.BadRequest;
    return;
  }

  if (!data) {
    res.body = {
      message: "Missing properties in request body",
    };
    res.type = "json";
    res.status = Status.BadRequest;
    return;
  }

  const { name, description, price, stock } = data;

  const product = await productsCollection
    .findOne({
      _id: new ObjectId(params.id),
    })
    .catch(() => {});

  if (!product) {
    res.body = {
      message: "Product not found",
    };
    res.type = "json";
    res.status = Status.NotFound;
    return;
  }

  await productsCollection.updateOne(
    { _id: product._id },
    { name, description, price, stock, updatedAt: new Date() }
  );

  res.body = product;
});

// Delete a product (by id)
router.delete("/products/:id", async ({ response: res, params }) => {
  if (params.id.length !== 24) {
    res.body = {
      message: "Invalid product id",
    };
    res.type = "json";
    res.status = Status.BadRequest;
    return;
  }

  await productsCollection.deleteOne({ _id: new ObjectId(params.id) });

  res.body = { _id: new ObjectId(params.id) };
  res.type = "json";
});

export default router;
