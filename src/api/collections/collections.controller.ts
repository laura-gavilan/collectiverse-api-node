import { Request, Response } from "express";
import { collection } from "./collections.model.js";

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
            return res.status(404).json({ error: "No se encontraron items en la colección" });
        }

        return res.json(userCollection);
    } catch (error) {
        return res.status(500).json({ error: "Error al obtener la colección" });
    }
};

export const getCollectionCount = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;

        const count = await collection.countDocuments({ userId });

        return res.json({ userId, total: count });
    } catch (error) {
        return res.status(500).json({ error: "Error al contar la colección" });
    }
};

export const addToCollection = async (req: Request, res: Response) => {
    try {
        const { userId, collectionId, collectionType, status } = req.body;

        if (!userId || !collectionId || !collectionType) {
            return res.status(400).json({ error: "userId, collectionId e collectionType son obligatorios" });
        }

        if (!["Comic", "Vinyl"].includes(collectionType)) {
            return res.status(400).json({ error: "collectionType debe ser 'Comic' o 'Vinyl'" });
        }

        const newItem = await collection.create({
            userId,
            collectionId,
            collectionType,
            status: status || "Tengo",
            completed: false,
        });

        return res.status(201).json(newItem);
    } catch (error: any) {
        if (error.code === 11000) {
            return res.status(400).json({ error: "Este item ya está en tu colección" });
        }
        return res.status(500).json({ error: "Error al añadir a la colección" });
    }
};

export const editCollectionStatus = async (req: Request, res: Response) => {
    try {
        const { id: idItem } = req.params;
        const { status } = req.body;

        const validStatus = ["Tengo", "Quiero", "Me falta", "Pendiente"];

        if (!status || !validStatus.includes(status)) {
            return res.status(400).json({ error: "Estado no válido. Usa: Tengo, Quiero, Me falta o Pendiente" });
        }

        const updatedItem = await collection.findByIdAndUpdate(idItem, { status }, { returnDocument: "after" });

        if (!updatedItem) {
            return res.status(404).json({ error: "Item no encontrado en la colección" });
        }

        return res.json(updatedItem);
    } catch (error) {
        return res.status(500).json({ error: "Error al actualizar el estado" });
    }
};

export const editConsumedStatus = async (req: Request, res: Response) => {
    try {
        const { id: idItem } = req.params;
        const { read, played } = req.body;

        const collectionItem = await collection.findById(idItem);

        if (!collectionItem) {
            return res.status(404).json({ error: "Item no encontrado en la colección" });
        }

        if (collectionItem.collectionType === "Comic") {
            if (typeof read !== "boolean") {
                return res.status(400).json({ error: "El campo read debe ser true o false" });
            }
            const updated = await collection.findByIdAndUpdate(idItem, { read }, { new: true });
            return res.json(updated);
        }

        if (collectionItem.collectionType === "Vinyl") {
            if (typeof played !== "boolean") {
                return res.status(400).json({ error: "El campo played debe ser true o false" });
            }
            const updated = await collection.findByIdAndUpdate(idItem, { played }, { new: true });
            return res.json(updated);
        }

        return res.status(400).json({ error: "collectionType no reconocido" });
    } catch (error) {
        return res.status(500).json({ error: "Error al actualizar el estado" });
    }
};

export const deleteCollection = async (req: Request, res: Response) => {
    try {
        const { id: idItem } = req.params;

        const deleted = await collection.findByIdAndDelete(idItem);

        if (!deleted) {
            return res.status(404).json({ error: "Item no encontrado en la colección" });
        }

        return res.status(200).json({ message: "Item eliminado de la colección" });
    } catch (error) {
        return res.status(500).json({ error: "Error al eliminar de la colección" });
    }
};