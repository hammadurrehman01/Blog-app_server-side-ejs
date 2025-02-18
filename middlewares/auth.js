import { validateToken } from "../services/auth.js";

export const checkAuthCookie = (cookieName) => {
    return (req, res, next) => {
        const tokenCookieValue = req.cookies[cookieName];
        if (!tokenCookieValue) {
            return next()
        }

        try {
            const user = validateToken(tokenCookieValue);

            req.user = user;

        } catch (error) {
            console.log(error.message)
        }
        finally {
            next();
        }
    }
}