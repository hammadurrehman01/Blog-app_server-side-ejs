import express from "express";
import path from "path";
import userRoute from "./routes/user.js";
import blogRoute from "./routes/blog.js";
import { connectDB } from "./db/index.js";
import cookieParser from "cookie-parser";
import { checkAuthCookie } from "./middlewares/auth.js";
import { Blog } from "./models/blog.js";

const app = express();
const PORT = 8000;

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cookieParser())
app.use(checkAuthCookie('token'))
app.use(express.static(path.resolve("./public")))

connectDB();

app.get('/', async (req, res) => {
    const allBlogs = await Blog.find();
    
    return res.render("home", {
        user: req.user,
        blogs: allBlogs
    })

})

app.use('/user', userRoute)
app.use('/blog', blogRoute)


app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
})