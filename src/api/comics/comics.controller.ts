import { Request, Response } from "express";
import { Comic } from "./comics.model.js";
import { sendError, sendSuccess } from "../../utils/response.utils.js";


export const getAllComic = async (req: Request, res: Response) => {
    try {
        const comics = await Comic.find().populate("category", "name slug");
        return sendSuccess(res, comics, "Cómics obtenidos correctamente");
    } catch (error) {
        return sendError(res, "Error al obtener los cómics", 500);
    }
};

export const getComicById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const comic = await Comic.findById(id).populate("category", "name slug");

        if (!comic) {
            return sendError(res, "Cómic no encontrado", 404);
        }

        return sendSuccess(res, comic, "Cómic encontrado");
    } catch (error) {
        return sendError(res, "Error al obtener el cómic", 500);
    }
};


export const createComic = async (req: Request, res: Response) => {
    try {
        const { title, category } = req.body;

        if (!title || !category) {
            return sendError(res, "Los campos title y categories son obligatorios", 400)
        }

        const newComic = await Comic.create({
            ...req.body,
            rating: { average: 0, story: 0, art: 0, edition: 0 }
        });
        return sendSuccess(res, newComic, "Cómic creado correctamente", 201);
    } catch (error) {
        return sendError(res, "Error al crear el cómic", 500);
    }
};


export const editComic = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const comic = await Comic.findByIdAndUpdate(id, req.body, { new: true });

        if (!comic) {
            return sendError(res, "Cómic no encontrado", 404);
        }
        return sendSuccess(res, comic, "Cómic editado correctamente");
    } catch (error) {
        return sendError(res, "Error al editar el cómic", 500);
    }
};

export const deleteComic = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const comic = await Comic.findByIdAndDelete(id);

        if (!comic) {
            return sendError(res, "Cómic no encontrado", 404);
        };

        return sendSuccess(res, null, "Cómic eliminado correctamente");
    } catch (error) {
        console.error(error);
        return sendError(res, "Error al eliminar el cómic", 500);
    };
};