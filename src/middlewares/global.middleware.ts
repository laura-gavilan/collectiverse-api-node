import { Response, NextFunction } from "express";
import { CustomRequest } from "../api/categories/categories.types.js"; 

export const requestLogger = (req: CustomRequest, res: Response, next: NextFunction) => {
    const now = new Date().getTime();
    const time = `[${now}] ${req.method}: ${req.url}`;
    console.log(time);
    req.http_info_log = time; 
    next();
};