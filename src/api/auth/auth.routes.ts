import { Router } from "express";
import * as authController from "./auth.controller.js"

export const authRoutes: Router = Router();

authRoutes.post("/register", authController.getRegister);

authRoutes.post("/login", authController.getLogin);

authRoutes.post("/logout", authController.getLogout);

authRoutes.post("/profile", authController.getProfile);