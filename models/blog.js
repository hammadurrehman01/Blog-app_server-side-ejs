import { Schema, model } from "mongoose";

const blogSchema = new Schema({
    title: {
        type: String,
        required: true,

    },
    description: {
        type: String,
        required: true,
    },
    bannerImage: {
        type: String,
        required: false,

    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'user'

    },
}, { timestamps: true });

export const Blog = model("blog", blogSchema);

