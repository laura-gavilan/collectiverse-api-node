import { Router } from "express";
import * as comicsController from "./comics.controller.js";


export const comicsRoutes: Router = Router();

comicsRoutes.get("/",comicsController.getAllComic);
comicsRoutes.get("/:id",comicsController.getComicById);
comicsRoutes.post("/", comicsController.createComic);
comicsRoutes.put("/:id", comicsController.editComic);
comicsRoutes.delete("/:id", comicsController.deleteComic);


