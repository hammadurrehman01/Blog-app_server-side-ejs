import { Router } from "express";
import { User } from "../models/user.js";

const router = Router();

router.get('/signup', (req, res) => {
    return res.render("signup")
})

router.get('/signin', (req, res) => {
    return res.render("signin")
})

router.post('/signin', async (req, res) => {
    try {
        const { email, password } = req.body;

        const token = await User.matchPasswordAndGenerateToken(email, password);

        return res.cookie("token", token).redirect("/")
    } catch (error) {
        return res.render("signin", {
            error: error.message
        })

    }
})

router.post('/signup', async (req, res) => {
    const { fullName, email, password, profileImageUrl } = req.body;

    await User.create({
        fullName,
        email,
        password,
        profileImageUrl: profileImageUrl ?? "/public.user-avatar.jpg"
    });
    return res.redirect("/user/signin")
})

router.get("/logout", (req, res) => {
    res.clearCookie("token").redirect("/")
})

export default router