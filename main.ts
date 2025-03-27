import { Hono } from "hono";
import { load } from "jsr:@std/dotenv";

await load({ export: true });

const app = new Hono();

app.get("/", (ctx) => {
    return ctx.text("Hono API server is running!");
});

const port = Number(Deno.env.get("PORT"));
Deno.serve({ port }, app.fetch);
