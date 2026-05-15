import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, "El nombre de usuario es obligatorio"],
        unique: true,
        index: true,
        trim: true,
    },
    email: {
        type: String,
        required: [true, "El email es obligatorio"],
        unique: true,
        lowercase: true,
        immutable: true,
    },
    password: {
        type: String,
        required: [true, "La contraseña es obligatoria"],
        select: false,
    },
    avatar: {
        type: String,
        default: "",
        match: [/^https?:\/\/.+/, "Por favor, usa una URL válida para el avatar"],
    },
    role: {
        type: String,
        enum: ["admin", "user", "guest"],
        default: "user",
    },
    bio: {
        type: String,
        default: "",
        maxLength: [500, "La bio no puede superar los 500 caracteres"],
    },
    age: {
        type: Number,
        min: [0, "La edad no puede ser negativa"],
    },
}, { timestamps: true }); // timestamps nos da createdAt y updatedAt 

export const User = mongoose.model("users", userSchema);

