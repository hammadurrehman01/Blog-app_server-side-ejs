import { connect } from "mongoose"

export const connectDB = async () => {
    try {
        const connection = await connect("mongodb://localhost:27017/blogging-app");
        if (connection) {
            console.log("MONGO Connected!");
        } else {
            console.log("Mongo was not be able to connect yet")
        }

    } catch (error) {
        console.log(error.message)
    }
}