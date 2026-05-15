import mongoose from "mongoose";
import db from "../../config/db.js";
import { Categories } from "./categories.model.js";

const categoryData = [
    //Cómics
    { name: "Manga",        slug: "manga",          itemType: "comics" },
    { name: "Europeo",      slug: "europeo",        itemType: "comics" },
    { name: "Americano",    slug: "americano",      itemType: "comics" },
    { name: "Independiente",slug: "independiente",  itemType: "comics" },
    { name: "Superhéroes",  slug: "superheroes",    itemType: "comics" },

    // Vinyls
    { name: "Rock",         slug: "rock",           itemType: "vinyls" },
    { name: "Jazz",         slug: "jazz",           itemType: "vinyls" },
    { name: "Pop",          slug: "pop",            itemType: "vinyls" },
    { name: "Electrónica",  slug: "electronica",    itemType: "vinyls" },
    { name: "Clásica",      slug: "clasica",        itemType: "vinyls" },
    { name: "Hip-Hop",      slug: "hip-hop",        itemType: "vinyls" },
    { name: "Otros",        slug: "otros",          itemType: "vinyls" },
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