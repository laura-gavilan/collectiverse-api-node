import { Router } from "express";
import * as categoriesController from "./categories.controller.js"
import { middleware1, validateCreateCategory, validateEditCategory } from "./categories.middlewares.js";


export const categoriesRoutes: Router = Router();


categoriesRoutes.get("/", [validateCreateCategory, middleware1], categoriesController.getCategories);
categoriesRoutes.get("/:id", categoriesController.getCategoryById);
categoriesRoutes.post("/", categoriesController.createCategory);
categoriesRoutes.put("/:id", validateEditCategory, categoriesController.editCategory);
categoriesRoutes.delete("/:id", categoriesController.deleteCategory)
