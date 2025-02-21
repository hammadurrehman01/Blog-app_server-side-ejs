import { connect } from "mongoose"

export const connectDB = async () => {
    try {
        const connection = await connect(process.env.MONGO_URI);
        if (connection) {
            console.log("MONGO Connected!");
        } else {
            console.log("Mongo was not be able to connect yet")
        }

    } catch (error) {
        console.log(error.message)
    }
}