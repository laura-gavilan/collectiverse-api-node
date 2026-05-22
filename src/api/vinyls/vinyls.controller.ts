import { Request, Response } from "express";
import { Vinyl } from "./vinyls.model.js";
import { sendError, sendSuccess } from "../../utils/response.utils.js";

export const getAllVinyl = async (req: Request, res: Response) => {
    try {
        const vinyls = await Vinyl.find().populate("category", "name slug");
        return sendSuccess(res, vinyls, "Vinilos obtenidos correctamente");
    } catch (error) {
        return sendError(res, "Error al obtener los vinilos", 500);
    }
};

export const getVinylById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const vinyl = await Vinyl.findById(id).populate("category", "name slug");

        if (!vinyl) {
            return sendError(res, "Vinilo no encontrado", 404);
        }

        return sendSuccess(res, vinyl, "Vinilo encontrado");
    } catch (error) {
        return sendError(res, "Error al obtener el vinilo", 500);
    };
}

export const createVinyl = async (req: Request, res: Response) => {
    try {
        const { title, category } = req.body;

        if (!title || !category) {
            return sendError(res, "Los campos title y category son obligatorios", 400);
        }

        const newVinyl = await Vinyl.create({
            ...req.body,
            rating: { average: 0, sound: 0, edition: 0 },
        });

        return sendSuccess(res, newVinyl, "Vinilo creado correctamente", 201);
    } catch (error) {
        return sendError(res, "Error al crear el vinilo", 500);
    }
};

export const editVinyl = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const vinyl = await Vinyl.findByIdAndUpdate(id, req.body, { new: true });

        if (!vinyl) {
            return sendError(res, "Vinilo no encontrado", 404);
        }

        return sendSuccess(res, vinyl, "Vinilo editado correctamente");
    } catch (error) {
        return sendError(res, "Error al editar el vinilo", 500);
    }
};

export const deleteVinyl = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const vinyl = await Vinyl.findByIdAndDelete(id);

        if (!vinyl) {
            return sendError(res, "Vinilo no encontrado", 404);
        }

        return sendSuccess(res, null, "Vinilo eliminado correctamente");
    } catch (error) {
        return sendError(res, "Error al eliminar el vinilo", 500);
    }
};