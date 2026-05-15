// import express from "express";

// const app = express();

// const PORT = 3000;

// let comics = [];

// //Coge la respuesta y la transforma a JSON
// app.use(express.json());

// //Crea el servidor
// app.listen(PORT, () => {
//     console.log(`Servidos funcionando en http://localhost:${PORT}`);
// });

// //Crea la ruta
// app.get("/", (req, res) => {
//     console.log(req)
//     return res.json({ message: "API collectiverse funcionando correctamente" });
// });

// app.get("/collection", (req, res) => {
//     console.log(req);
//     return res.json(comics);
// });

// //POST
// //Añadir cómics a la colección

// app.post("/collection", (req, res) => {
//     const { title } = req.body;

//     if (!title) {
//         return res.status(400).json("El campo title es obligatorio");
//     }

//     const newComic = {
//         id: Date.now(),
//         title,
//         status: req.body.status || "tengo",
//     };

//     comics.push(newComic);

//     return res.status(201).json(newComic);


// });

// //PUT
// app.put("/collection/:id", (req, res) => {
//     const { id } = req.params; //Coge el id de la url


//     const index = comics.findIndex(comic => comic.id === Number(id));

//     if (index === -1) {
//         return res.status(404).json({ error: "Cómic no encontrado" });
//     };

//     comics[index] = {
//         ...comics[index], 
//         ...req.body          
//     };

//     return res.status(200).json(comics);
// });

// //DELETE
// app.delete("/collection/:id", (req, res) => {
//     const { id } = req.params;

//     const index = comics.findIndex(comic => comic.id === Number(id));

//     if (index === -1 ) {
//         return res.status(404).json({ error: "Cómic no encontrado" });
//     };

//     comics.splice(index, 1);


//     return res.status(200).json(comics);
// });

