import { Application } from "oak";
import { oakCors } from "cors";
import "./database/connection.ts";
import apiRoutes from "./routes/api.routes.ts";
const app = new Application();

// Settings
const port = parseInt(Deno.env.get("port") as string) || 3000;

// Middlewares
app.use(oakCors({ origin: "*" }));

// Routes
app.use(apiRoutes.routes());
app.use(apiRoutes.allowedMethods());

// Start server
app.listen({ port });
