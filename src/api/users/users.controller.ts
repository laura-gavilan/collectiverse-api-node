import { Request, Response } from "express";
import { User } from "./users.model.js";
import { sendError, sendSuccess } from "../../utils/response.utils.js";


export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find();
        return sendSuccess(res, users, "Usuarios obtenidos correctamente");
    } catch (error) {
        return sendError(res, "Error al obtener los usuarios", 500);
    }
};

export const getUsersById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);

        if (!user) {
            return sendError(res, "Usuario no encontrado", 404);
        };

        return sendSuccess(res, user, "Usuario encontrado");
    } catch (error) {
        return sendError(res, "Error al obtener el usuario", 500);
    }
};

export const createUser = async (req: Request, res: Response) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return sendError(res, "Los campos username, email y password son obligatorios", 400);
        }

        const newUser = await User.create(req.body);
        return sendSuccess(res, newUser, "Usuario creado correctamente", 201);
    } catch (error: any) {
        if (error.code === 11000) {
            const field = Object.keys(error.keyValue)[0];
            return sendError(res, `El ${field} ya está en uso`, 400);
        }
        return sendError(res, "Error al crear el usuario", 500);
    };
};

export const editUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        delete req.body.id;

        const user = await User.findByIdAndUpdate(id, req.body, { new: true });

        if (!user) {
            return sendError(res, "Usuario no encontrado", 404);
        }
        return sendSuccess(res, user, "Usuario editado correctamente");
    } catch (error) {
        return sendError(res, "Error al editar el usuario", 500);
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return sendError(res, "Usuario no encontrado", 404);
        }

        return sendSuccess(res, null, "Usuario eliminado correctamente");
    } catch (error) {
        return sendError(res, "Error al eliminar el usuario", 500);
    }
};