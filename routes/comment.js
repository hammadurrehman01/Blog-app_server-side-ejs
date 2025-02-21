import { Router } from "express";
import { Blog } from "../models/blog.js";
import { Comment } from "../models/comment.js";

const router = Router();

router.post('/:blogId', async (req, res) => {
    const { content } = req.body;
    await Comment.create({
        content,
        blogId: req.params.blogId,
        createdBy: req.user._id
    })
    res.redirect(`/blog/${req.params.blogId}`)
})

export default router