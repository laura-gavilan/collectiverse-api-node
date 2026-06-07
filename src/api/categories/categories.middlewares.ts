import { Request, Response, NextFunction } from "express";
import { sendError } from "../../utils/response.utils.js";
import { CustomRequest } from "./categories.types.js";

export const middleware1 = (req: CustomRequest, res: Response, next: NextFunction) => {
    console.log("Hola, soy un Middleware de ruta - Ejemplo 1");
    req.propiedad = "Me he inventado esto";
    next();
};

export const middleware2 = (req: CustomRequest, res: Response, next: NextFunction) => {
    console.log("Hola, soy un Middleware de ruta - Ejemplo 2");

    console.log("Ejemplo 2:", req.propiedad);
    console.log("Ejemplo 2: ", req.http_info_log);
    next();
};

// Middleware para validar la CREACIÓN
export const validateCreateCategory = (req: Request, res: Response, next: NextFunction) => {
    const { name, collectionType } = req.body;

    if (!name || typeof name !== "string" || name.trim() === "") {
        return sendError(res, "El campo name es obligatorio y debe ser un texto válido", 400);
    }

    if (!collectionType) {
        return sendError(res, "El campo collectionType es obligatorio", 400);
    }

    if (collectionType !== "Comic" && collectionType !== "Vinyl") {
        return sendError(res, "collectionType debe ser exactamente 'Comic' o 'Vinyl'", 400);
    }

    req.body.name = name.trim();

    next();
};


export const validateEditCategory = (req: Request, res: Response, next: NextFunction) => {
    const { name, collectionType } = req.body;

    if (!name || typeof name !== "string" || name.trim() === "") {
        return sendError(res, "El campo name es obligatorio", 400);
    }

    if (collectionType && collectionType !== "Comic" && collectionType !== "Vinyl") {
        return sendError(res, "collectionType debe ser 'Comic' o 'Vinyl'", 400);
    }

    req.body.name = name.trim();

    next();
};