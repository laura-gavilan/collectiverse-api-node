import { Router } from "express";
import * as categoriesController from "./categories.controller.js"


export const categoriesRoutes: Router = Router();

categoriesRoutes.get("/", categoriesController.getCategories);
categoriesRoutes.get("/:id", categoriesController.getCategoryById);
categoriesRoutes.post("/", categoriesController.createCategory);
categoriesRoutes.put("/:id", categoriesController.editCategory);
categoriesRoutes.delete("/:id", categoriesController.deleteCategory)
