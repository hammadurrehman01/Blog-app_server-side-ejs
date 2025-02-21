import { Router } from "express";
import path from "path";
import multer from "multer";
import { Blog } from "../models/blog.js";
import { Comment } from "../models/comment.js";

const router = Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve("./public/uploads/"))
    },
    filename: function (req, file, cb) {
        const filename = `${Date.now()}-${file.originalname}`
        cb(null, filename)
    }
});

const upload = multer({ storage: storage })

router.get('/add-new', (req, res) => {
    return res.render("addBlog")
})

router.get('/:id', async (req, res) => {
    const blogId = req.params.id
    const blog = await Blog.findById(blogId).populate("createdBy");
    const comments = await Comment.find({ blogId: blogId }).populate("createdBy");

    return res.render("blog", {
        user: req.user,
        blog,
        comments
    })
})

router.post('/', upload.single("bannerImage"), async (req, res) => {
    const { title, description, bannerImage, } = req.body;
    await Blog.create({
        title,
        description,
        bannerImage: `/uploads/${req.file.filename}`,
        createdBy: req.user._id
    })
    res.redirect("/")
})

export default router