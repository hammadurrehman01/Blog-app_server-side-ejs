import express from "express";
import path from "path";
import userRoute from "./routes/user.js";
import blogRoute from "./routes/blog.js";
import commentRoute from "./routes/comment.js";
import { connectDB } from "./db/index.js";
import cookieParser from "cookie-parser";
import { checkAuthCookie } from "./middlewares/auth.js";
import { Blog } from "./models/blog.js";
import dotenv from "dotenv";

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(cookieParser());
app.set("view engine", "ejs");
app.use(checkAuthCookie("token"));
app.set("views", path.resolve("./views"));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.resolve("./public")));

app.use("/user", userRoute);
app.use("/blog", blogRoute);
app.use("/comment", commentRoute);

dotenv.config();
connectDB();

app.get("/", async (req, res) => {
  const allBlogs = await Blog.find().sort({ createdAt: -1 });

  return res.render("home", {
    user: req.user,
    blogs: allBlogs,
  });
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
