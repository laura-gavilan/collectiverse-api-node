import { Request, Response } from "express"
import { Categories } from "./categories.model.js";
import { sendError, sendSuccess } from "../../utils/response.utils.js";


export const getCategories = async (req: Request, res: Response) => {
    try {
        const filter: Record<string, any> = {};
        const categories = await Categories.find(filter);

        return sendSuccess(res, categories, "Categorías obtenidas correctamente");
    } catch (error) {
        return sendError(res, (error as Error).message, 500);
    }
};

export const getCategoryById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const category = await Categories.findById(id);

        if (!category) {
            return sendError(res, "Categoría no encontrada");
        }
        return sendSuccess(res, category, "Categoría encontrada");
    } catch (error) {
        return sendError(res, "Error al obtener la categoría", 500);
    }
};


export const createCategory = async (req: Request, res: Response) => {
    try {
        const { name, collectionType } = req.body;
        if (!name || !collectionType) {
            return sendError(res, "El campo name y collectionType son obligatorios", 400);
        };

        const formattedType = collectionType.charAt(0).toUpperCase() + collectionType.slice(1).toLowerCase();

        if (!["Comic", "Vinyl"].includes(formattedType)) {
            return sendError(res, "collectionType debe ser 'Comic' o 'Vinyl'", 400);
        }

        const newCategory = await Categories.create({ name, collectionType: formattedType });
        return sendSuccess(res, newCategory, "Categoría creada correctamente", 201);
    } catch (error) {
        return sendError(res, "Error al crear la categoría", 500);
    }
};

export const editCategory = async (req: Request, res: Response) => {
    try {
        const { name, collectionType } = req.body;
        if (!name) {
            return sendError(res, "El campo name es obligatorio", 400);
        };

        const category = await Categories.findByIdAndUpdate(req.params.id, { name, ...(collectionType && { collectionType }) }, { new: true });

        if (!category) {
            return sendError(res, "Categoría no encontrada", 404);
        };

        return sendSuccess(res, category, "Categoría editada correctamente");
    } catch (error) {
        return sendError(res, "Error al editar la categoría", 500);
    }
};

export const deleteCategory = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const category = await Categories.findByIdAndDelete(id);
        if (!category) {
            return sendError(res, "Categoría no encontrada", 404);
        };

        return sendSuccess(res, null, "Categoría eliminada correctamente");
    } catch (error) {
        return sendError(res, "Error al eliminar la categoría", 500);
    }
};