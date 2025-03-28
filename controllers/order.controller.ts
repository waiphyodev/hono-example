import { Context } from "hono";
import Order from "../models/order.model.ts";
import responseHelper from "../helpers/response.helper.ts";

export const createOrder = async (ctx: Context) => {
    const body = await ctx.req.json();

    try {
        await Order.create(body);

        return ctx.json(responseHelper.created(), 201);
    } catch (error) {
        if (error instanceof Error) return ctx.json(responseHelper.unknown(error.message), 500);
    }
};

export const getOrderList = async (ctx: Context) => {
    try {
        const list = await Order.find();

        return ctx.json(responseHelper.ok({ data: list }), 200);
    } catch (error) {
        if (error instanceof Error) return ctx.json(responseHelper.unknown(error.message), 500);
    }
};

export const getOrderDetail = async (ctx: Context) => {
    const id = ctx.req.param("id");

    try {
        const detail = await Order.findById(id);

        return ctx.json(responseHelper.ok(detail), 200);
    } catch (error) {
        if (error instanceof Error) return ctx.json(responseHelper.unknown(error.message), 500);
    }
};

export const updateOrder = async (ctx: Context) => {
    const id = ctx.req.param("id");
    const body = await ctx.req.json();
    const { tableId, items, status, totalAmount } = body;

    try {
        const detail = await Order.findByIdAndUpdate(id, { tableId, items, status, totalAmount });
        if (!detail) return ctx.json(responseHelper.notFound(), 404);

        return ctx.json(responseHelper.ok(), 200);
    } catch (error) {
        if (error instanceof Error) return ctx.json(responseHelper.unknown(error.message), 500);
    }
};

export const deleteOrder = async (ctx: Context) => {
    const id = ctx.req.param("id");

    try {
        const detail = await Order.findByIdAndDelete(id);
        if (!detail) return ctx.json(responseHelper.notFound(), 404);

        return ctx.json(responseHelper.ok(), 200);
    } catch (error) {
        if (error instanceof Error) return ctx.json(responseHelper.unknown(error.message), 500);
    }
};
