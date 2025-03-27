import { Schema, model } from "mongoose";

const tableSchema = new Schema(
    {
        status: {
            type: String,
            enum: ["available", "occupied"],
            default: "available",
        },
        number: {
            type: Number,
            required: [true, "Table number is required."],
        },
    },
    {
        collection: "tables",
        versionKey: false,
    }
);

const Table = model("Table", tableSchema);

export default Table;
