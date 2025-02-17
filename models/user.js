import { Schema, model } from "mongoose";
import { randomBytes, createHmac } from "crypto";

const userSchema = new Schema({
    fullName: {
        type: String,
        required: true,

    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    salt: {
        type: String,
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['USER', 'ADMIN'],
        default: 'USER'
    },
    profileImageUrl: {
        type: String,
    }
}, { timestamps: true });

userSchema.pre("save", function (next) {
    const user = this;

    if (!user.isModified("password")) return;

    const salt = randomBytes(16).toString();
    const hashedPassword = createHmac('sha256', salt)
        .update(user.password)
        .digest("hex")

    this.salt = salt;
    this.password = hashedPassword;

    next();
})


userSchema.static("matchPassword", async function (email, password) {
    try {
        const user = await User.findOne({ email });

        if (!user) throw new Error("User not found");

        const salt = user.salt;
        const hashedPassword = user.password;

        const userProvidedHash = createHmac('sha256', salt)
            .update(password)
            .digest("hex")

        if (hashedPassword === userProvidedHash) {
            return user
        }
    } catch (error) {
        throw new Error(error.message);
    }

})


export const User = model("user", userSchema);

