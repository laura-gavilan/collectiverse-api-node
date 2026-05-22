import { Request, Response } from "express";
import { collection } from "./collections.model.js";
import { sendError, sendSuccess } from "../../utils/response.utils.js";

export const getCollection = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;

        const userCollection = await collection
            .find({ userId })
            .populate({
                path: "collectionId",
                select: "title coverImage rating status artist author year", 
            });

        if (userCollection.length === 0) {
            return sendError(res, "No se encontraron items en la colección", 404);
        }

        return sendSuccess(res, userCollection, "Colección obtenida correctamente");
    } catch (error) {
        return sendError(res, "Error al obtener la colección", 500);
    }
};

export const getCollectionCount = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;

        const count = await collection.countDocuments({ userId });

        return sendSuccess(res, { userId, total: count }, "Conteo de colección realizado");
    } catch (error) {
        return sendError(res, "Error al contar la colección", 500);
    }
};

export const addToCollection = async (req: Request, res: Response) => {
    try {
        const { userId, collectionId, collectionType, status } = req.body;

        if (!userId || !collectionId || !collectionType) {
            return sendError(res, "userId, collectionId y collectionType son obligatorios", 400);
        }

        if (!["Comic", "Vinyl"].includes(collectionType)) {
            return sendError(res, "collectionType debe ser 'Comic' o 'Vinyl'", 400);
        }

        const newItem = await collection.create({
            userId,
            collectionId,
            collectionType,
            status: status || "Tengo",
            completed: false,
        });

        return sendSuccess(res, newItem, "Item añadido a la colección correctamente", 201);
    } catch (error: any) {
        if (error.code === 11000) {
            return sendError(res, "Este item ya está en tu colección", 400);
        }
        return sendError(res, "Error al añadir a la colección", 500);
    }
};

export const editCollectionStatus = async (req: Request, res: Response) => {
    try {
        const { id: idItem } = req.params;
        const { status } = req.body;

        const validStatus = ["Tengo", "Quiero", "Me falta", "Pendiente"];

        if (!status || !validStatus.includes(status)) {
            return sendError(res, "Estado no válido. Usa: Tengo, Quiero, Me falta o Pendiente", 400);
        }

        const updatedItem = await collection.findByIdAndUpdate(idItem, { status }, { returnDocument: "after" });

        if (!updatedItem) {
            return sendError(res, "Item no encontrado en la colección", 404);
        }

        return sendSuccess(res, updatedItem, "Estado de la colección actualizado");
    } catch (error) {
        return sendError(res, "Error al actualizar el estado", 500);
    }
};

export const editConsumedStatus = async (req: Request, res: Response) => {
    try {
        const { id: idItem } = req.params;
        const { read, played } = req.body;

        const collectionItem = await collection.findById(idItem);

        if (!collectionItem) {
            return sendError(res, "Item no encontrado en la colección", 404);
        }

        if (collectionItem.collectionType === "Comic") {
            if (typeof read !== "boolean") {
                return sendError(res, "El campo read debe ser true o false", 400);
            }
            const updated = await collection.findByIdAndUpdate(idItem, { read }, { new: true });
            return sendSuccess(res, updated, "Estado de lectura actualizado");
        }

        if (collectionItem.collectionType === "Vinyl") {
            if (typeof played !== "boolean") {
                return sendError(res, "El campo played debe ser true o false", 400);
            }
            const updated = await collection.findByIdAndUpdate(idItem, { played }, { new: true });
            return sendSuccess(res, updated, "Estado de reproducción actualizado");
        }

        return sendError(res, "collectionType no reconocido", 400);
    } catch (error) {
        return sendError(res, "Error al actualizar el estado", 500);
    }
};

export const deleteCollection = async (req: Request, res: Response) => {
    try {
        const { id: idItem } = req.params;

        const deleted = await collection.findByIdAndDelete(idItem);

        if (!deleted) {
            return sendError(res, "Item no encontrado en la colección", 404);
        }

        return sendSuccess(res, null, "Item eliminado de la colección");
    } catch (error) {
        return sendError(res, "Error al eliminar de la colección", 500);
    }
};