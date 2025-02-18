import jwt from "jsonwebtoken";

const secretKey = "adchfwuifh";

const createUserToken = (user) => {

    const payload = {
        _id: user._id,
        email: user.email,
        profileImageUrl: user.profileImageUrl,
        role: user.role,
    };

    const token = jwt.sign(payload, secretKey);
    return token;
}


const validateToken = (token) => {
    const payload = jwt.verify(token, secretKey);
    return payload
}

export {
    createUserToken,
    validateToken
}