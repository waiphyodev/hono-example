import { Hono } from "hono";
import { load } from "jsr:@std/dotenv";
import connectMongo from "./configs/mongo.config.ts";
import mainRoutes from "./routes/index.ts";

await load({ export: true });

const app = new Hono();

await connectMongo();

app.route("/api", mainRoutes);

const port = Number(Deno.env.get("PORT"));
Deno.serve({ port }, app.fetch);
