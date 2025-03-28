import { Hono } from "hono";
import tableRoutes from "./table.route.ts";
import menuRoutes from "./menu.route.ts";
import orderRoutes from "./order.route.ts";

const mainRoutes = new Hono();

mainRoutes.get("/", (ctx) => {
    return ctx.text("Hono API server is running!");
});

mainRoutes.route("/tables", tableRoutes);
mainRoutes.route("/menus", menuRoutes);
mainRoutes.route("/orders", orderRoutes);

export default mainRoutes;
