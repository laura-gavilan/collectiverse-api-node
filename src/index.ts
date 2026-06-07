import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import { comicsRoutes } from "./api/comics/comics.routes.js";
import { authRoutes } from "./api/auth/auth.routes.js";
import { usersRoutes } from "./api/users/users.routes.js";
import { categoriesRoutes } from "./api/categories/categories.routes.js";
import db from "./config/db.js";
import { collectionRoutes } from "./api/collections/collections.routes.js";
import { vinylsRoutes } from "./api/vinyls/vinyls.routes.js";
import { errorHandler, notFoundHandler } from "./utils/error.middleware.js";
import { requestLogger } from "./middlewares/global.middleware.js";



db.connect();


const app: Application = express();
const PORT:  number = Number(process.env.PORT) || 3000;

//Coge la respuesta y la transforma a JSON
app.use(express.json());

app.use(cors());

app.use(requestLogger);

//Crea la ruta
app.get("/", (req: Request, res: Response) => {
    console.log(process.env.MONGO_URI)
    return res.json({ message: "API collectiverse funcionando correctamente" });
});


app.use("/comics", comicsRoutes);
app.use("/auth", authRoutes);
app.use("/users", usersRoutes);
app.use("/categories", categoriesRoutes);
app.use("/collections", collectionRoutes);
app.use("/vinyls", vinylsRoutes);

app.use(notFoundHandler);  //middleware. next: da paso al siguiente punto de ejecución del servidor. Al ejecutar next pasa a la siguiente función (la de abajo)
app.use(errorHandler); //manejador global de errores. 

//Crea el servidor
app.listen(PORT, () => {
    console.log(`Servidos funcionando en http://localhost:${PORT}`);
});