import mongoose from "mongoose";
import db from "../../config/db.js";
import { User } from "./users.model.js";

const userData = [
    {
        username: "PedroTest",
        email: "pedro@test.com",
        password: "Password1234!",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=pedro",
        role: "admin",
        bio: "Administrador de Collectiverse y coleccionista empedernido de cómics.",
        age: 28,
    },
    {
        username: "AnaComic",
        email: "ana@test.com",
        password: "Password4321!",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ana",
        role: "user",
        bio: "Amante del manga y los cómics europeos. Siempre buscando nuevas joyas.",
        age: 25,
    },
    {
        username: "CarlosRead",
        email: "carlos@test.com",
        password: "test1234",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=carlos",
        role: "user",
        bio: "Fan incondicional de Watchmen y todo el universo de Alan Moore.",
        age: 32,
    },
    {
        username: "InvitadoDemo",
        email: "guest@test.com",
        password: "invitado1234",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=guest",
        role: "guest",
        bio: "Solo echando un vistazo a las colecciones de la comunidad.",
        age: 20,
    },
];

mongoose
    .connect(db.DB_URL)
    .then(async () => {
        const allUsers = await User.find();

        if (allUsers.length) {
            console.log("Deleting users collection...");
            await User.collection.drop();
            console.log("Users collection deleted successfully.");
        } else {
            console.log("No existing users found, preparing to seed...");
        }
    })
    .catch((error: unknown) => console.log("There was an error when deleting users.", error))
    .then(async () => {
        await User.insertMany(userData);
        console.log("Users added successfully!");
    })
    .catch((error: unknown) => console.log("Error adding users to database", error))
    .finally(() => {
        mongoose.disconnect();
        console.log("Disconnected from MongoDB.");
    });