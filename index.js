import express from "express";
import path from "path";
import userRoute from "./routes/user.js";
import { connectDB } from "./db/index.js";
import cookieParser from "cookie-parser";
import { checkAuthCookie } from "./middlewares/auth.js";

const app = express();
const PORT = 8000;

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cookieParser())
app.use(checkAuthCookie('token'))

connectDB();

app.get('/', (req, res) => {
    return res.render("home")
})

app.use('/user', userRoute)

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
})