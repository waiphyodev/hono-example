import { Context } from "hono";
import Table from "../models/table.model.ts";
import responseHelper from "../helpers/response.helper.ts";

export const createTable = async (ctx: Context) => {
    const body = await ctx.req.json();

    try {
        await Table.create(body);

        return ctx.json(responseHelper.created(), 201);
    } catch (error) {
        if (error instanceof Error) return ctx.json(responseHelper.unknown(error.message), 500);
    }
};

export const getTableList = async (ctx: Context) => {
    try {
        const list = await Table.find();

        return ctx.json(responseHelper.ok({ list }), 200);
    } catch (error) {
        if (error instanceof Error) return ctx.json(responseHelper.unknown(error.message), 500);
    }
};

export const getTableDetail = async (ctx: Context) => {
    const id = ctx.req.param("id");

    try {
        const detail = await Table.findById(id);

        return ctx.json(responseHelper.ok(detail), 200);
    } catch (error) {
        if (error instanceof Error) return ctx.json(responseHelper.unknown(error.message), 500);
    }
};

export const updateTable = async (ctx: Context) => {
    const id = ctx.req.param("id");
    const body = await ctx.req.json();
    const { status, number } = body;

    try {
        const detail = await Table.findByIdAndUpdate(id, { status, number });
        if (!detail) return ctx.json(responseHelper.notFound(), 404);

        return ctx.json(responseHelper.ok(), 200);
    } catch (error) {
        if (error instanceof Error) return ctx.json(responseHelper.unknown(error.message), 500);
    }
};

export const deleteTable = async (ctx: Context) => {
    const id = ctx.req.param("id");

    try {
        const detail = await Table.findByIdAndDelete(id);
        if (!detail) return ctx.json(responseHelper.notFound(), 404);

        return ctx.json(responseHelper.ok(), 200);
    } catch (error) {
        if (error instanceof Error) return ctx.json(responseHelper.unknown(error.message), 500);
    }
};
