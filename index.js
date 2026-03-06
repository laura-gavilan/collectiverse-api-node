// Express
import express from "express";

const app = express();

const PORT = 3000;

let dreams = [];

// Coge la respuesta y la transforma a JSON.
app.use(express.json());

// Crea la ruta /
app.get("/", (req, res) => {
    return res.json({ message: "✅ Servidor funcionando correctamente" });
});

// POST /dream
app.post("/dreams", (req, res) => {
    console.log(req.body);

    if (!req.body.title) {
        return res.status(400).json("El campo 'title' es obligatorio");
    }

    const newDream = {
        // id: Date.now(),
        ...req.body,
    }

    dreams.push(newDream)
    
    return res.status(201).json(dreams);
})

app.put() // 

app.delete();

// Crea el servidor
app.listen(PORT, () => {
    console.log(`Servidor funcionando en http://localhost:${PORT}`);
});
