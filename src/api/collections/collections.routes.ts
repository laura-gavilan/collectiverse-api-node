import { Router } from "express";
import * as collectionsController from "./collections.controller.js";

export const collectionRoutes: Router = Router();


collectionRoutes.get("/:userId", collectionsController.getCollection);
collectionRoutes.get("/:userId/count", collectionsController.getCollectionCount);
collectionRoutes.post("/", collectionsController.addToCollection);
collectionRoutes.put("/:id", collectionsController.editCollectionStatus);
collectionRoutes.put("/:id/consumed", collectionsController.editConsumedStatus);
collectionRoutes.delete("/:id", collectionsController.deleteCollection);