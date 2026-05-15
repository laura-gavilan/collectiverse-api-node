import mongoose, { Schema } from "mongoose";
import { ComicStatus } from "./comics.types.js";


const ratingSchema = new Schema({
    average: { type: Number, default: 0, min: 0, max: 10 },
    story: { type: Number, default: 0, min: 0, max: 10 },
    art: { type: Number, default: 0, min: 0, max: 10 },
    edition: { type: Number, default: 0, min: 0, max: 10 },
}, { _id: false }); // _id: false porque es un subdocumento, no necesita su propio id

const comicSchema = new Schema({
    title: {
        type: String,
        required: [true, "El título del cómic es obligatorio"],
        trim: true,
        index: true,
    },
    style: {
        type: String,
        enum: ["Europeo", "Americano", "Manga"],
        default: "Americano",
    },
    author: {
        type: String,
        trim: true,
        default: "",
    },
    editorial: {
        type: String,
        trim: true,
        default: "",
    },
    volume: {
        type: Number,
        min: [0, "El volumen no puede ser negativo"],
        default: 0,
    },
    chapters: {
        type: Number,
        min: [0, "Los capítulos no pueden ser negativos"],
        default: 0,
    },
    year: {
        type: Number,
        min: [1900, "El año no puede ser anterior a 1900"],
        max: [new Date().getFullYear(), "El año no puede ser futuro"],
        default: new Date().getFullYear(),
    },
    pages: {
        type: Number,
        min: [0, "Las páginas no pueden ser negativas"],
        default: 0,
    },
    description: {
        type: String,
        maxLength: [2000, "La descripción no puede superar los 2000 caracteres"],
        default: "",
    },
    status: {
        type: String,
        enum: Object.values(ComicStatus),
        default: ComicStatus.OWNED,
    },
    coverImage: {
        type: String,
        default: "",
        match: [/^https?:\/\/.+/, "Por favor, usa una URL válida para la portada"],
    },
    amazonLink: {
        type: String,
        default: "",
        match: [/^https?:\/\/(www\.)?([a-z0-9-]+\.)+[a-z]{2,}(\/[^\s]*)?$/i, "Por favor, usa una URL válida para el enlace de Amazon"],
    },
    previewImages: {
        type: [String],
        default: [],
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: "categories",
        required: true,
    },
    rating: {
        type: ratingSchema,
        default: () => ({ average: 0, story: 0, art: 0, edition: 0 }),
    },
}, { timestamps: true });

export const Comic = mongoose.model("comics", comicSchema);