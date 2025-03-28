import { Context } from "hono";
import Menu from "../models/menu.model.ts";
import responseHelper from "../helpers/response.helper.ts";

export const createMenu = async (ctx: Context) => {
    const body = await ctx.req.json();

    try {
        await Menu.create(body);

        return ctx.json(responseHelper.created(), 201);
    } catch (error) {
        if (error instanceof Error) return ctx.json(responseHelper.unknown(error.message), 500);
    }
};

export const getMenuList = async (ctx: Context) => {
    try {
        const list = await Menu.find();

        return ctx.json(responseHelper.ok({ list }), 200);
    } catch (error) {
        if (error instanceof Error) return ctx.json(responseHelper.unknown(error.message), 500);
    }
};

export const getMenuDetail = async (ctx: Context) => {
    const id = ctx.req.param("id");

    try {
        const detail = await Menu.findById(id);

        return ctx.json(responseHelper.ok(detail), 200);
    } catch (error) {
        if (error instanceof Error) return ctx.json(responseHelper.unknown(error.message), 500);
    }
};

export const updateMenu = async (ctx: Context) => {
    const id = ctx.req.param("id");
    const body = await ctx.req.json();
    const { name, description, price, category, imageUrl, isAvailable } = body;

    try {
        const detail = await Menu.findByIdAndUpdate(id, { name, description, price, category, imageUrl, isAvailable });
        if (!detail) return ctx.json(responseHelper.notFound(), 404);

        return ctx.json(responseHelper.ok(), 200);
    } catch (error) {
        if (error instanceof Error) return ctx.json(responseHelper.unknown(error.message), 500);
    }
};

export const deleteMenu = async (ctx: Context) => {
    const id = ctx.req.param("id");

    try {
        const detail = await Menu.findByIdAndDelete(id);
        if (!detail) return ctx.json(responseHelper.notFound(), 404);

        return ctx.json(responseHelper.ok(), 200);
    } catch (error) {
        if (error instanceof Error) return ctx.json(responseHelper.unknown(error.message), 500);
    }
};
