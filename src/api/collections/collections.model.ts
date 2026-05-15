import mongoose, { Schema } from "mongoose";

const collectionsSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: [true, "El usuario es obligatorio"],
        index: true,
    },
    collectionId: {
        type: Schema.Types.ObjectId,
        required: [true, "El item es obligatorio"],
        refPath: "collectionType",
    },
    collectionType: {
        type: String,
        required: true,
        enum: ["Comic", "Vinyl"],  
    },
    status: {
        type: String,
        enum: {
            values: ["Tengo", "Quiero", "Me falta", "Pendiente"],
            message: "{VALUE} no es un estado válido",
        },
        default: "Tengo",
    },
    read: {
        type: Boolean,
        default: false,
    },
    played: {
        type: Boolean,
        default: false,
    },
    completed: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });


collectionsSchema.index({ userId: 1, collectionId: 1, collectionType: 1 }, { unique: true });

export const collection = mongoose.model("collections", collectionsSchema);