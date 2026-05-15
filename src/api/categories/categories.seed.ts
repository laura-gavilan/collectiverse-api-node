import mongoose from "mongoose";
import db from "../../config/db.js";
import { Categories } from "./categories.model.js";

const categoryData = [
    { name: "Manga", slug: "manga", collectionType: "Comic" },
    { name: "Europeo", slug: "europeo", collectionType: "Comic" },
    { name: "Americano", slug: "americano", collectionType: "Comic" },
    { name: "Independiente", slug: "independiente", collectionType: "Comic" },
    { name: "Superhéroes", slug: "superheroes", collectionType: "Comic" },

    { name: "Rock", slug: "rock", collectionType: "Vinyl" },
    { name: "Jazz", slug: "jazz", collectionType: "Vinyl" },
    { name: "Pop", slug: "pop", collectionType: "Vinyl" },
    { name: "Electrónica", slug: "electronica", collectionType: "Vinyl" },
    { name: "Clásica", slug: "clasica", collectionType: "Vinyl" },
    { name: "Hip-Hop", slug: "hip-hop", collectionType: "Vinyl" },
    { name: "Otros", slug: "otros", collectionType: "Vinyl" },
];


mongoose
    .connect(db.DB_URL)
    .then(async () => {
        const allCategories = await Categories.find();

        if (allCategories.length) {
            console.log("Deleting categories collection...");
            await Categories.collection.drop();
            console.log("Categories collection deleted successfully.");
        } else {
            console.log("No existing categories found, preparing to seed...");
        }
    })
    .catch((error: unknown) => console.log("There was an error when deleting categories.", error))
    .then(async () => {
        await Categories.insertMany(categoryData);
        console.log("Categories added successfully!");
    })
    .catch((error: unknown) => console.log("Error adding categories to database", error))
    .finally(() => {
        mongoose.disconnect();
        console.log("Disconnected from MongoDB.");
    });