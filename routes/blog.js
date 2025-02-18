import { Router } from "express";
import path from "path";
import multer from "multer";
import { Blog } from "../models/blog.js";

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