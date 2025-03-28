import { Schema, models, model } from "mongoose";

const orderSchema = new Schema(
    {
        tableId: {
            type: Schema.Types.ObjectId,
            ref: "Table",
            required: true,
        },
        items: [
            {
                _id: false,
                menuId: {
                    type: Schema.Types.ObjectId,
                    ref: "Menu",
                    required: true,
                },
                quantity: {
                    type: Number,
                    required: true,
                    min: 1,
                },
            },
        ],
        status: {
            type: String,
            enum: ["pending", "preparing", "served", "completed"],
            default: "pending",
        },
        totalAmount: {
            type: Number,
            required: true,
        },
    },
    {
        versionKey: false,
        collection: "orders",
        timestamps: true,
    }
);

const Order = models.Order || model("Order", orderSchema);

export default Order;
