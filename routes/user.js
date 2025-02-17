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
    const { email, password } = req.body;

    const user = await User.matchPassword(email, password)
    
    return res.redirect("/")
})

router.post('/signup', async (req, res) => {
    const { fullName, email, password } = req.body;

    await User.create({
        fullName,
        email,
        password
    });
    return res.redirect("/user/signin")
})

export default router