import mongoose, { Schema } from "mongoose";
import { VinylStatus } from "./vinyls.types.js";

const vinylRatingSchema = new Schema({
    average: { type: Number, default: 0, min: 0, max: 10 },
    sound: { type: Number, default: 0, min: 0, max: 10 },
    edition: { type: Number, default: 0, min: 0, max: 10 },
}, { _id: false });

const vinylSchema = new Schema({
    title: {
        type: String,
        required: [true, "El título del vinilo es obligatorio"],
        trim: true,
        index: true,
    },
    artist: {
        type: String,
        trim: true,
        default: "",
    },
    label: {
        type: String,
        trim: true,
        default: "",
    },
    format: {
        type: String,
        enum: ["LP", "EP", "Single", "Maxi-Single"],
        default: "LP",
    },
    year: {
        type: Number,
        min: [1900, "El año no puede ser anterior a 1900"],
        max: [new Date().getFullYear(), "El año no puede ser futuro"],
        default: new Date().getFullYear(),
    },
    tracks: {
        type: Number,
        min: [0, "Las pistas no pueden ser negativas"],
        default: 0,
    },
    description: {
        type: String,
        maxLength: [2000, "La descripción no puede superar los 2000 caracteres"],
        default: "",
    },
    category: {               
        type: Schema.Types.ObjectId,
        ref: "categories",
        required: true,
    },
    status: {
        type: String,
        enum: Object.values(VinylStatus),
        default: VinylStatus.OWNED,
    },
    coverImage: {
        type: String,
        default: "",
        match: [/^https?:\/\/.+/, "Por favor, usa una URL válida para la portada"],
    },
    amazonLink: {
        type: String,
        default: "",
    },
    rating: {
        type: vinylRatingSchema,
        default: () => ({ average: 0, sound: 0, edition: 0 }),
    },
}, { timestamps: true });

export const Vinyl = mongoose.model("vinyls", vinylSchema);