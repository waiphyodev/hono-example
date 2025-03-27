import { Hono } from "hono";
import { createTable, getTableDetail, getTableList } from "../controllers/table.controller.ts";

const tableRoutes = new Hono();

tableRoutes.post("/", createTable);
tableRoutes.get("/", getTableList);
tableRoutes.get("/:id", getTableDetail);

export default tableRoutes;