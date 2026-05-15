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
    itemType: {
        type: String,
        required: true,
        enum: ["comics", "vinyls"],
    },

}, { timestamps: true });

export const Categories = mongoose.model("categories", categorySchema);