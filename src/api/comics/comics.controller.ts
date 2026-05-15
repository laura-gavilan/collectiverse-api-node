import { Request, Response } from "express";
import { Comic } from "./comics.model.js";


export const getAllComic = async (req: Request, res: Response) => {
    try {
        const comics = await Comic.find().populate("category", "name slug");
        return res.json(comics);
    } catch (error) {
        return res.status(500).json({ error: "Error al obtener los cómics" });
    }
};

export const getComicById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const comic = await Comic.findById(id).populate("category", "name slug");

        if (!comic) {
            return res.status(404).json({ error: "Cómic no encontrado" });
        }

        return res.json(comic);
    } catch (error) {
        return res.status(500).json({ error: "Error al obtener el cómic" });
    }
};


export const createComic = async (req: Request, res: Response) => {
    try {
        const { title, category } = req.body;

        if (!title || !category) {
            return res.status(400).json({ error: "Los campos title y categories son obligatorios" });
        }

        const newComic = await Comic.create({
            ...req.body,
            rating: { average: 0, story: 0, art: 0, edition: 0 }
        });
        return res.status(201).json(newComic);
    } catch (error) {
        return res.status(500).json({ error: "Error al crear el cómic" });
    }
};


export const editComic = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const comic = await Comic.findByIdAndUpdate(id, req.body, { new: true });

        if (!comic) {
            return res.status(404).json({ error: "Cómic no encontrado" });
        }
        return res.status(200).json(comic);
    } catch (error) {
        return res.status(500).json({ error: "Error al editar el cómic" });
    }
};

export const deleteComic = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const comic = await Comic.findByIdAndDelete(id);

        if (!comic) {
            return res.status(404).json({ error: "Cómic no encontrado" });
        };

        return res.status(200).json({ message: "Cómic eliminado correctamente" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Error al eliminar el cómic" });
    };
};