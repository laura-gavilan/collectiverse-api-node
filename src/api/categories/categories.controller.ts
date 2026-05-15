import { Request, Response } from "express"
import { Categories } from "./categories.model.js";

export const getCategories = async (req: Request, res: Response) => {
    try {
        const { itemType } = req.query;  

        const filter = itemType ? { itemType: itemType as string } : {};
        const categories = await Categories.find(filter);

        return res.json({ message: "Categorías", categories });
    } catch (error) {
        return res.status(500).json({ error: "Error al obtener categorías" });
    }
};

export const getCategoryById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const category = await Categories.findById(id);

        if (!category) {
            return res.status(404).json({ error: "Categoría no encontrada" });
        }
        return res.json(category);
    } catch (error) {
        return res.status(500).json({ error: "Error al obtener la categoría" });
    }
};


export const createCategory = async (req: Request, res: Response) => {
    try {
        const { name, itemType} = req.body;
        if (!name || !itemType) {
            return res.status(400).json({ error: "El campo name es obligatorio" });
        };

        const newCategory = await Categories.create({ name, itemType });
        return res.status(201).json(newCategory);
    } catch (error) {
        return res.status(500).json({ error: "Error al crear la categoría" });
    }
};

export const editCategory = async (req: Request, res: Response) => {
    try {
        const { name, itemType } = req.body;
        if (!name) {
            return res.status(400).json({ error: "El campo name es obligatorio" });
        };

        const category = await Categories.findByIdAndUpdate(req.params.id, { name, ...(itemType && { itemType })}, { new: true });

        if (!category) {
            return res.status(404).json({ error: "Categoría no encontrada" });
        };

        return res.json(category);
    } catch (error) {
        return res.status(500).json({ error: "Error al editar la categoría" });
    }
};

export const deleteCategory = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const category = await Categories.findByIdAndDelete(id);
        if (!category) {
            return res.status(404).json({ error: "Categoría no encontrada" });
        };

        return res.status(200).json({ message: "Categoría eliminada correctamente" });
    } catch (error) {
        return res.status(500).json({ error: "Error al eliminar la categoría" });
    }
};