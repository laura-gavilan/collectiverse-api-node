import mongoose, { Schema } from "mongoose";

const categorySchema = new Schema({
    name: {
        type: String,
        required: [true, "El nombre de la categoría es obligatorio"],
        trim: true,
    },
    slug: {
        type: String,
        unique: true,
        index: true,
        trim: true,
    },
    collectionType: {
        type: String,
        required: true,
        enum: ["Comic", "Vinyl"],
    },

}, { timestamps: true });

export const Categories = mongoose.model("categories", categorySchema);