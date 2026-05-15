import { Request, Response } from "express";
import { Vinyl } from "./vinyls.model.js";

export const getAllVinyl = async (req: Request, res: Response) => {
    try {
        const vinyls = await Vinyl.find().populate("category", "name slug");
        return res.json(vinyls);
    } catch (error) {
        return res.status(500).json({ error: "Error al obtener los vinilos" });
    }
};

export const getVinylById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const vinyl = await Vinyl.findById(id).populate("category", "name slug");

        if (!vinyl) {
            return res.status(404).json({ error: "Vinilo no encontrado" });
        }

        return res.json(vinyl);
    } catch (error) {
        return res.status(500).json({ error: "Error al obtener el vinilo" });
    }
};

export const createVinyl = async (req: Request, res: Response) => {
    try {
        const { title, category } = req.body;

        if (!title || !category) {
            return res.status(400).json({ error: "El campo title es obligatorio" });
        }

        const newVinyl = await Vinyl.create({
            ...req.body,
            rating: { average: 0, sound: 0, edition: 0 },
        });

        return res.status(201).json(newVinyl);
    } catch (error) {
        return res.status(500).json({ error: "Error al crear el vinilo" });
    }
};

export const editVinyl = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const vinyl = await Vinyl.findByIdAndUpdate(id, req.body, { new: true });

        if (!vinyl) {
            return res.status(404).json({ error: "Vinilo no encontrado" });
        }

        return res.status(200).json(vinyl);
    } catch (error) {
        return res.status(500).json({ error: "Error al editar el vinilo" });
    }
};

export const deleteVinyl = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const vinyl = await Vinyl.findByIdAndDelete(id);

        if (!vinyl) {
            return res.status(404).json({ error: "Vinilo no encontrado" });
        }

        return res.status(200).json({ message: "Vinilo eliminado correctamente" });
    } catch (error) {
        return res.status(500).json({ error: "Error al eliminar el vinilo" });
    }
};