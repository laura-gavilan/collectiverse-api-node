import { Request, Response } from "express";

export const getRegister =  (req: Request, res: Response) => {
    return res.json("Ruta register correcta");
};

export const getLogin = (req: Request, res: Response) => {
    return res.json("Ruta LOGIN correcta");
};

export const getLogout = (req: Request, res: Response) => {
    return res.json("Ruta LOGOUT correcta");
};

export const getProfile = (req: Request, res: Response) => {
    return res.json("Ruta profile");
};