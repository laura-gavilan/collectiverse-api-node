import { Request, Response } from "express";
import { User } from "./users.model.js";


export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find();
        return res.json(users);
    } catch (error) {
        return res.status(500).json({ error: "Error al obtener los usuarios" });
    }
};

export const getUsersById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        };

        return res.json(user);
    } catch (error) {
        return res.status(500).json({ error: "Error al obtener el usuario" });
    }
};

export const createUser = async (req: Request, res: Response) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ error: "Los campos username, email y password son obligatorios" });
        }

        const newUser = await User.create(req.body);
        return res.status(201).json(newUser);
    } catch (error: any) {
        if (error.code === 11000) {
            const field = Object.keys(error.keyValue)[0];
            return res.status(400).json({ error: `El ${field} ya está en uso` });
        }
        return res.status(500).json({ error: "Error al crear el usuario" });
    }
};

export const editUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        delete req.body.id;

        const user = await User.findByIdAndUpdate(id, req.body, { new: true });

        if (!user) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }
        return res.json(user);
    } catch (error) {
        return res.status(500).json({ error: "Error al editar el usuario" });
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }

        return res.status(200).json({ message: "Usuario eliminado correctamente" });
    } catch (error) {
        return res.status(500).json({ error: "Error al eliminar el usuario" });
    }
};