import mongoose from "mongoose";
import db from "../../config/db.js";
import { collection } from "./collections.model.js";
import { User } from "../users/users.model.js";
import { Comic } from "../comics/comics.model.js";
import { Vinyl } from "../vinyls/vinyls.model.js";

mongoose
    .connect(db.DB_URL)
    .then(async () => {
        const allCollections = await collection.find();

        if (allCollections.length) {
            console.log("Deleting usersCollections collection...");
            await collection.collection.drop();
            console.log("UsersCollections collection deleted successfully.");
        } else {
            console.log("No existing collections found, preparing to seed...");
        }
    })
    .catch((error: unknown) => console.log("There was an error when deleting collections.", error))
    .then(async () => {
        const users = await User.find();
        const comics = await Comic.find();
        const vinyls = await Vinyl.find();

        if (!users.length || !comics.length || !vinyls.length) {
            console.log("⚠️  Ejecuta primero users.seed.ts y comics.seed.ts");
            return;
        }

        const collectionData = [
            { userId: users[0]._id, collectionId: comics[0]._id, collectionType: "comics", status: "Tengo", read: true },
            { userId: users[0]._id, collectionId: comics[1]._id, collectionType: "comics", status: "Tengo", read: false },
            { userId: users[0]._id, collectionId: comics[5]._id, collectionType: "comics", status: "Tengo", read: true },
            { userId: users[1]._id, collectionId: comics[2]._id, collectionType: "comics", status: "Quiero", read: false },
            { userId: users[1]._id, collectionId: comics[0]._id, collectionType: "comics", status: "Tengo", read: true },
            { userId: users[2]._id, collectionId: comics[3]._id, collectionType: "comics", status: "Pendiente", read: false },

        
            { userId: users[0]._id, collectionId: vinyls[0]._id, collectionType: "vinyls", status: "Tengo", played: true },
            { userId: users[1]._id, collectionId: vinyls[2]._id, collectionType: "vinyls", status: "Quiero", played: false },
            { userId: users[2]._id, collectionId: vinyls[1]._id,collectionType: "vinyls", status: "Tengo", played: true },
            { userId: users[2]._id, collectionId: vinyls[4]._id, collectionType: "vinyls", status: "Pendiente", played: false },
        ];

        await collection.insertMany(collectionData);
        console.log("UserCollections added successfully!");
    })
    .catch((error: unknown) => console.log("Error adding collections to database", error))
    .finally(() => {
        mongoose.disconnect();
        console.log("Disconnected from MongoDB.");
    });