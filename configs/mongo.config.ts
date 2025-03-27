import { connect } from "mongoose";

const connectMongo = async () => {
    const mongodbUri = Deno.env.get("MONGODB_URI") || "";

    await connect(mongodbUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    } as any)
        .then(() => console.log("DB is connected."))
        .catch((error) => error instanceof Error && console.log("DB connection error => ", error.message));
};

export default connectMongo;
