import { Context } from "hono";
import Order from "../models/order.model.ts";
import responseHelper from "../helpers/response.helper.ts";
import mongoose from "mongoose";
import Table from "../models/table.model.ts";

export const createOrder = async (ctx: Context) => {
    const body = await ctx.req.json();
    const { tableId } = body;
    if (!tableId) return ctx.json(responseHelper.badRequest(), 400);

    const session = await mongoose.startSession();

    try {
        session.startTransaction();

        await Order.create([body], { session });

        await Table.findByIdAndUpdate(tableId, { status: "occupied" }, { session });

        await session.commitTransaction();

        return ctx.json(responseHelper.created(), 201);
    } catch (error) {
        await session.abortTransaction();

        if (error instanceof Error) return ctx.json(responseHelper.unknown(error.message), 500);
    } finally {
        await session.endSession();
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

    const session = await mongoose.startSession();

    try {
        session.startTransaction();

        const detail = await Order.findByIdAndUpdate(id, { items, status, totalAmount }, { session });
        if (!detail) return ctx.json(responseHelper.notFound(), 404);

        if (status === "completed") {
            await Table.findByIdAndUpdate(tableId, { status: "available" }, { session });
        }

        await session.commitTransaction();

        return ctx.json(responseHelper.ok(), 200);
    } catch (error) {
        await session.abortTransaction();

        if (error instanceof Error) return ctx.json(responseHelper.unknown(error.message), 500);
    } finally {
        await session.endSession();
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
