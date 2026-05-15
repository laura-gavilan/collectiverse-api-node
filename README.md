Collectiverse
Descripción

Collectiverse es una aplicación web diseñada para coleccionistas de cómics, películas y vinilos (actualmente enfocada en cómics).
Permite a los usuarios gestionar y organizar sus colecciones, registrar cómics, clasificarlos por categorías, llevar un control de lo que tienen, quieren o les falta, y compartir su actividad con amigos.

La aplicación incluye:

Registro e inicio de sesión

Gestión de cómics con información completa

Colecciones personales con estados de lectura

Puntuaciones detalladas (guion, dibujo, edición y nota final)

Reseñas de usuarios

Muro social y actividad de amigos

Filtrado avanzado y estadísticas

Posibilidad futura de integrar películas, vinilos, eventos y tiendas cercanas

🔹 Funcionalidades
Usuario

Registrarse, iniciar sesión y cerrar sesión

Ver y editar su perfil

Gestión de cómics

Ver la lista de cómics y detalles de cada uno

Añadir, editar y eliminar cómics

Ver un pequeño avance (aprox. 8 páginas)

Filtrar por categoría, autor, editorial, estilo, año, capítulos, páginas y puntuación

Colección

Añadir cómics a la colección personal

Marcar estado: Tengo, Quiero, Me falta

Marcar como Leído / Falta por leer

Ver número total de colecciones

Marcar favoritos

Puntuaciones y reseñas

Puntuar cómics de forma general y por guion, dibujo y edición

Añadir, editar y eliminar reseñas

Ver puntuaciones y reseñas de otros usuarios

Red social / amigos

Buscar usuarios

Enviar, aceptar o rechazar solicitudes de amistad

Ver la colección de amigos

Muro de actividad: “Ana añadió Spider-Man #1 a su colección”

Registrar acciones automáticamente en la actividad

Estadísticas

Top de cómics más populares

Top de usuarios con más colecciones o mejores puntuaciones

🔹 Modelos de datos
Usuario

id_usuario

nombre_usuario

email

contraseña (hashed)

avatar

fecha_registro

Cómic

id_comic

nombre_comic

estilo (europeo, americano, manga…)

autor, guionista, ilustrador

editorial

numero_volumen

numero_capitulos

año_publicacion

numero_paginas

descripcion

imagen_portada

enlace_amazon

avance_comic (mini PDF o imágenes)

rating_promedio, rating_guion, rating_dibujo, rating_edicion

Categoría

id_categoria

nombre_categoria

Colección de usuario

id_coleccion

id_usuario

id_comic

estado (tengo / quiero / me_falta)

leido (sí/no)

Amigos

id_amistad

id_usuario

id_amigo

estado (pendiente / aceptado / bloqueado)

Actividad

id_actividad

id_usuario

tipo_accion (añadió, cambió, puntuó, favorito, comentario)

id_comic

descripcion

fecha

Reseñas

id_resena

id_usuario

id_comic

titulo_resena

texto_resena

puntuacion_total, puntuacion_guion, puntuacion_dibujo, puntuacion_edicion

fecha

🔹 Rutas de la API
Autenticación
Método	Ruta	Qué hace
POST	/register	Registrar un usuario nuevo
POST	/login	Iniciar sesión
GET	/profile	Ver el perfil del usuario logueado
Usuarios
Método	Ruta	Qué hace
GET	/usuarios	Ver todos los usuarios
GET	/usuarios/:id	Ver un usuario por su id
PUT	/usuarios/:id	Editar la información de un usuario
DELETE	/usuarios/:id	Eliminar un usuario
Cómics
Método	Ruta	Qué hace
GET	/comics	Ver todos los cómics
GET	/comics/:id	Ver un cómic por su id
POST	/comics	Crear un nuevo cómic
PUT	/comics/:id	Editar un cómic
DELETE	/comics/:id	Eliminar un cómic
GET	/comics/:id/avance	Ver un pequeño avance del cómic (8 páginas aprox.)
GET	/comics?categoria=X&autor=Y&año_min=A&año_max=B&estado=Z&rating_min=R	Filtrar cómics por múltiples criterios
Puntuación de cómics
Método	Ruta	Qué hace
POST	/comics/:id/rating	Añadir puntuación general
PUT	/comics/:id/rating	Modificar puntuación general
DELETE	/comics/:id/rating	Eliminar puntuación
GET	/comics/:id/rating	Ver todas las puntuaciones
POST	/comics/:id/rating_detallado	Añadir puntuación por guion, dibujo, edición y nota final
GET	/comics/:id/rating_detallado	Ver puntuaciones detalladas
Categorías
Método	Ruta	Qué hace
GET	/categorias	Ver todas las categorías
GET	/categorias/:id	Ver una categoría
POST	/categorias	Crear categoría
PUT	/categorias/:id	Editar categoría
DELETE	/categorias/:id	Eliminar categoría
Colección del usuario
Método	Ruta	Qué hace
GET	/coleccion	Ver colección del usuario
POST	/coleccion	Añadir un cómic a la colección
PUT	/coleccion/:id	Cambiar estado (tengo / quiero / me_falta)
PUT	/coleccion/:id/leido	Marcar leído / falta por leer
DELETE	/coleccion/:id	Eliminar un cómic de la colección
GET	/usuarios/:id/colecciones/count	Ver número total de colecciones del usuario
Amigos
Método	Ruta	Qué hace
GET	/amigos	Ver lista de amigos
POST	/amigos	Enviar solicitud de amistad
PUT	/amigos/:id	Aceptar solicitud de amistad
DELETE	/amigos/:id	Eliminar un amigo
Actividad / Muro social
Método	Ruta	Qué hace
GET	/actividad	Ver actividad reciente de tus amigos
GET	/actividad/:usuario_id	Ver actividad pública de un usuario
POST	/actividad	Registrar acción del usuario
DELETE	/actividad/:id	Eliminar acción del muro
Reseñas
Método	Ruta	Qué hace
POST	/comics/:id/resenas	Añadir reseña de un cómic
GET	/comics/:id/resenas	Ver todas las reseñas de un cómic
PUT	/resenas/:id	Editar tu reseña
DELETE	/resenas/:id	Eliminar tu reseña
🔹 Privado vs Público
Privado

Contraseña, email y colección personal

Añadir, editar o eliminar cómics

Marcar estado de lectura

Crear, aceptar o eliminar amistades

Escribir reseñas y puntuaciones

Público

Ver cómics y sus detalles

Buscar cómics por categoría, autor, estilo, etc.

Ver categorías

Ver perfil público de usuarios

Avance de los cómics (mini preview)

┌────────────┐       ┌─────────────┐       ┌────────────┐
│  Usuarios  │       │   Amigos    │       │  Categorias│
├────────────┤       ├─────────────┤       ├────────────┤
│ id_usuario │<─────>│ id_usuario  │       │ id_categoria│
│ nombre     │       │ id_amigo    │       │ nombre      │
│ email      │       │ estado      │       └────────────┘
│ contraseña │       └─────────────┘
│ avatar     │
│ fecha_reg  │
└────────────┘
       │
       │
       │
       ▼
┌────────────┐       ┌──────────────┐
│   Comics   │       │ Coleccion    │
├────────────┤       ├──────────────┤
│ id_comic   │<─────>│ id_coleccion │
│ nombre     │       │ id_usuario   │
│ estilo     │       │ id_comic     │
│ autor      │       │ estado       │ <- tengo / quiero / me_falta
│ guionista  │       │ leido        │ <- sí / no
│ ilustrador │       │ fecha_agregado│
│ editorial  │       └──────────────┘
│ numero_vol │
│ numero_cap │
│ año_pub    │
│ paginas    │
│ descripcion│
│ imagen     │
│ enlace_amz │
│ avance_comic│
│ rating_prom│
│ rating_guion│
│ rating_dibujo│
│ rating_edicion│
│ id_categoria│
└────────────┘
       │
       │
       ▼
┌───────────────┐       ┌─────────────┐
│  Reseñas      │       │ Actividad   │
├───────────────┤       ├─────────────┤
│ id_resena     │       │ id_actividad│
│ id_usuario    │       │ id_usuario  │
│ id_comic      │       │ tipo_accion │ <- añadió, puntuó, favorito...
│ titulo        │       │ id_comic    │
│ texto         │       │ descripcion │
│ puntuacion_total│     │ fecha       │
│ puntuacion_guion│
│ puntuacion_dibujo│
│ puntuacion_edicion│
│ fecha          │
└───────────────┘