import { Router } from "express";
import * as vinylsController from "./vinyls.controller.js";

export const vinylsRoutes: Router = Router();

vinylsRoutes.get("/", vinylsController.getAllVinyl);
vinylsRoutes.get("/:id", vinylsController.getVinylById);
vinylsRoutes.post("/", vinylsController.createVinyl);
vinylsRoutes.put("/:id", vinylsController.editVinyl);
vinylsRoutes.delete("/:id", vinylsController.deleteVinyl);