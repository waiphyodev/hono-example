import { Hono } from "hono";
import tableRoutes from "./table.route.ts";

const mainRoutes = new Hono();

mainRoutes.get("/", (ctx) => {
    return ctx.text("Hono API server is running!");
});

mainRoutes.route("/tables", tableRoutes);

export default mainRoutes;
