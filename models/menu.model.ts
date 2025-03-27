import { Schema, models, model } from "mongoose";

const menuSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required."],
        },
        description: {
            type: String,
        },
        price: {
            type: Number,
            required: [true, "Price is required."],
        },
        category: {
            type: String,
            required: [true, "Category is required."],
        },
        imageUrl: {
            type: String,
            required: [true, "Image URL is required."],
        },
        isAvailable: {
            type: Boolean,
            default: true,
        },
    },
    {
        collection: "menus",
        versionKey: false,
        timestamps: true,
    }
);

const Menu = models.Menu || model("Menu", menuSchema);

export default Menu;
