import { Hono } from "hono";
import {
    createTable,
    deleteTable,
    getTableDetail,
    getTableList,
    updateTable,
} from "../controllers/table.controller.ts";

const tableRoutes = new Hono();

tableRoutes.post("/", createTable);
tableRoutes.get("/", getTableList);
tableRoutes.get("/:id", getTableDetail);
tableRoutes.put("/:id", updateTable);
tableRoutes.delete("/:id", deleteTable);

export default tableRoutes;
