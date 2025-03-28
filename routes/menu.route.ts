import { Hono } from "hono";
import { createMenu, deleteMenu, getMenuDetail, getMenuList, updateMenu } from "../controllers/menu.controller.ts";

const menuRoutes = new Hono();

menuRoutes.post("/", createMenu);
menuRoutes.get("/", getMenuList);
menuRoutes.get("/:id", getMenuDetail);
menuRoutes.put("/:id", updateMenu);
menuRoutes.delete("/:id", deleteMenu);

export default menuRoutes;
