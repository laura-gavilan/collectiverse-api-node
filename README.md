# Tu Primera API con Node - 🌙 Dream List API

API REST sencilla para gestionar una lista de sueños. En esta clase aprenderás a crear un servidor con **Node.js** y **Express**, y a manejar las operaciones CRUD básicas.

---

## 📦 1. Inicializar el proyecto

Abre la terminal en la carpeta del proyecto y ejecuta:

```bash
npm init -y
```

Esto generará un archivo `package.json` con la configuración por defecto.

> **Importante:** Para poder usar `import` en lugar de `require`, añade la siguiente línea en tu `package.json`:
>
> ```json
> "type": "module"
> ```

---

## 📥 2. Instalar dependencias

### Express (dependencia de producción)

```bash
npm install express
```

### Nodemon (dependencia de desarrollo)

Nodemon reinicia automáticamente el servidor cada vez que guardas un cambio en tu código. Se instala como **dependencia de desarrollo** porque solo lo necesitamos mientras programamos (aunque en clase lo he instalado como depedencia normal, lo correcto es instalarla como dependencia de desarrollo):

```bash
npm i -D nodemon
```

> **Nota:** Con `--save-dev` (o `-D`) le indicamos a npm que es una dependencia de desarrollo. Verás que se guarda en `devDependencies` dentro de `package.json`.

---

## ⚙️ 3. Configurar los scripts

En tu `package.json`, añade estos scripts:

```json
"scripts": {
  "start": "node index.js",
  "dev": "nodemon index.js"
}
```

- `npm start` → Ejecuta el servidor una sola vez.
- `npm run dev` → Ejecuta el servidor con nodemon (se reinicia al guardar cambios). **Usa este durante el desarrollo.**

---

## 🚀 4. Crear el servidor

Crea un archivo `index.js` con el siguiente contenido:

```js
// Express
import express from "express";

const app = express();

const PORT = 3000;

let dreams = [];

// Middleware: transforma el body de las peticiones a JSON
app.use(express.json());

// GET / — Comprobar que el servidor funciona
app.get("/", (req, res) => {
    return res.json({ message: "✅ Servidor funcionando correctamente" });
});

// POST /dreams — Crear un nuevo sueño
app.post("/dreams", (req, res) => {
    console.log(req.body);

    if (!req.body.title) {
        return res.status(400).json("El campo 'title' es obligatorio");
    }

    const newDream = {
        id: Date.now(),
        ...req.body,
    };

    dreams.push(newDream);

    return res.status(201).json(dreams);
});

// PUT /dreams/:id — Actualizar un sueño (📝 EJERCICIO)
// TODO: Completa esta ruta

// DELETE /dreams/:id — Eliminar un sueño (📝 EJERCICIO)
// TODO: Completa esta ruta

// Crea el servidor
app.listen(PORT, () => {
    console.log(`Servidor funcionando en http://localhost:${PORT}`);
});
```

Arranca el servidor con:

```bash
npm run dev
```

Deberías ver en la terminal:

```
Servidor funcionando en http://localhost:3000
```

---

## 🧪 5. Probar con Postman

### GET `/`

- **Método:** `GET`
- **URL:** `http://localhost:3000/`
- **Respuesta esperada:**
  ```json
  { "message": "✅ Servidor funcionando correctamente" }
  ```

### POST `/dreams`

- **Método:** `POST`
- **URL:** `http://localhost:3000/dreams`
- **Body** (pestaña Body → raw → JSON):
  ```json
  {
    "title": "Viajar a Japón",
    "description": "Visitar Tokio y Kioto"
  }
  ```
- **Respuesta esperada (201):**
  ```json
  [
    {
      "id": 1709741234567,
      "title": "Viajar a Japón",
      "description": "Visitar Tokio y Kioto"
    }
  ]
  ```

### PUT `/dreams/:id`

- **Método:** `PUT`
- **URL:** `http://localhost:3000/dreams/1709741234567` (usa el `id` real del sueño creado)
- **Body** (pestaña Body → raw → JSON):
  ```json
  {
    "title": "Viajar a Japón y Corea",
    "description": "Visitar Tokio, Kioto y Seúl"
  }
  ```

### DELETE `/dreams/:id`

- **Método:** `DELETE`
- **URL:** `http://localhost:3000/dreams/1709741234567` (usa el `id` real del sueño)
- **Body:** No necesita body.

---

## 📝 6. Ejercicio: Completa las rutas PUT y DELETE

Ya tienes funcionando `GET /` y `POST /dreams`. Ahora te toca implementar las dos rutas que faltan.

### 🔧 PUT `/dreams/:id` — Actualizar un sueño

**Pistas:**

1. La ruta debe incluir un **parámetro dinámico** para el id. En Express se define así:
   ```js
   app.put("/dreams/:id", (req, res) => {
       // ...
   });
   ```

2. Puedes acceder al parámetro `id` de la URL con `req.params.id`.

3. Usa el método `.findIndex()` del array para buscar el sueño que coincida con ese `id`. Recuerda que `req.params.id` es un **string**, así que tendrás que convertirlo a número o comparar correctamente.

4. Si el sueño **no existe** (el índice es `-1`), devuelve un error `404` con un mensaje descriptivo.

5. Si el sueño **existe**, actualiza sus datos. Piensa en cómo usar el spread operator (`...`) para mantener el `id` original pero actualizar el resto de campos con lo que viene en `req.body`.

6. Devuelve el array `dreams` actualizado con un status `200`.

> 💡 **Estructura general:**
> ```
> 1. Obtener el id de req.params
> 2. Buscar el índice del sueño en el array
> 3. Si no existe → responder con 404
> 4. Si existe → actualizar el sueño en el array
> 5. Responder con el array actualizado
> ```

---

### 🗑️ DELETE `/dreams/:id` — Eliminar un sueño

**Pistas:**

1. La ruta se define igual que la de PUT, pero con `app.delete(...)`.

2. También recibes el `id` por `req.params.id`.

3. Busca el índice del sueño a eliminar con `.findIndex()`.

4. Si **no existe**, devuelve un `404`.

5. Si **existe**, elimínalo del array. Investiga el método `.splice()` o piensa en cómo podrías usar `.filter()` para crear un nuevo array sin ese elemento.

6. Devuelve el array `dreams` actualizado con status `200`.

> 💡 **Estructura general:**
> ```
> 1. Obtener el id de req.params
> 2. Buscar el índice del sueño en el array
> 3. Si no existe → responder con 404
> 4. Si existe → eliminar el sueño del array
> 5. Responder con el array actualizado
> ```

---

### ✅ Checklist de validación

Cuando termines, comprueba que:

- [ ] `POST /dreams` crea un sueño con un `id` único (descomenta `id: Date.now()` en el código)
- [ ] `PUT /dreams/:id` actualiza un sueño existente y devuelve `200`
- [ ] `PUT /dreams/:id` devuelve `404` si el sueño no existe
- [ ] `DELETE /dreams/:id` elimina un sueño existente y devuelve `200`
- [ ] `DELETE /dreams/:id` devuelve `404` si el sueño no existe

---

## 📚 Recursos útiles

- [Documentación de Express](https://expressjs.com/)
- [req.params en Express](https://expressjs.com/en/api.html#req.params)
- [Descargar Postman](https://www.postman.com/downloads/)
