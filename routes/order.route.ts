import { Hono } from "hono";
import {
    createOrder,
    deleteOrder,
    getOrderDetail,
    getOrderList,
    updateOrder,
} from "../controllers/order.controller.ts";

const orderRoutes = new Hono();

orderRoutes.post("/", createOrder);
orderRoutes.get("/", getOrderList);
orderRoutes.get("/:id", getOrderDetail);
orderRoutes.put("/:id", updateOrder);
orderRoutes.delete("/:id", deleteOrder);

export default orderRoutes;
