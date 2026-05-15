import { Router } from "express";
import * as usersController from "./users.controller.js";
import * as collectionController from "../collections/collections.controller.js"

export const usersRoutes: Router = Router();

usersRoutes.get("/", usersController.getUsers);
usersRoutes.get("/:id", usersController.getUsersById);
usersRoutes.get("/:id/colecciones/count", collectionController.getCollectionCount);
usersRoutes.post("/", usersController.createUser);
usersRoutes.put("/:id", usersController.editUser);
usersRoutes.delete("/:id", usersController.deleteUser);