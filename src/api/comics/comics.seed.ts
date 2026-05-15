import mongoose from "mongoose";
import db from "../../config/db.js";
import { Comic } from "./comics.model.js";
import { ComicStatus } from "./comics.types.js";

const comicData = [
    {
        title: "Watchmen",
        style: "Americano",
        author: "Alan Moore",
        editorial: "DC Comics",
        volume: 1,
        chapters: 12,
        year: 1986,
        pages: 416,
        description: "Una historia de superhéroes en un mundo alternativo donde los justicieros son reales y la Guerra Fría amenaza con destruir el planeta.",
        status: ComicStatus.OWNED,
        // coverImage: "https://upload.wikimedia.org/wikipedia/en/a/a2/Watchmen%2C_Issue_1.jpg",
        amazonLink: "https://amazon.es/watchmen",
        // previewImages: [
        //     "https://upload.wikimedia.org/wikipedia/en/a/a2/Watchmen%2C_Issue_1.jpg",
        // ],
        category: "Superhéroes",
        rating: { average: 9.5, story: 10, art: 9, edition: 9 },
    },
    {
        title: "Akira Vol. 1",
        style: "Manga",
        author: "Katsuhiro Otomo",
        editorial: "Kodansha",
        volume: 1,
        chapters: 8,
        year: 1982,
        pages: 364,
        description: "Distopía cyberpunk ambientada en Neo-Tokio donde un joven motociclista desencadena poderes psíquicos devastadores.",
        status: ComicStatus.OWNED,
        coverImage: "https://upload.wikimedia.org/wikipedia/en/3/3f/Akira_vol1.jpg",
        amazonLink: "https://amazon.es/akira",
        // previewImages: [
        //     "https://upload.wikimedia.org/wikipedia/en/3/3f/Akira_vol1.jpg",
        // ],
        category: "Manga",
        rating: { average: 9.8, story: 10, art: 10, edition: 9 },
    },
    {
        title: "Saga Vol. 1",
        style: "Americano",
        author: "Brian K. Vaughan",
        editorial: "Image Comics",
        volume: 1,
        chapters: 6,
        year: 2012,
        pages: 160,
        description: "Épica espacial de ciencia ficción y fantasía que sigue a dos guerreros de razas enemigas que huyen con su recién nacida hija.",
        status: ComicStatus.WANTED,
        coverImage: "https://upload.wikimedia.org/wikipedia/en/6/6b/Saga_vol_1_tp.jpg",
        amazonLink: "https://amazon.es/saga",
        // previewImages: [
        //     "https://upload.wikimedia.org/wikipedia/en/6/6b/Saga_vol_1_tp.jpg",
        // ],
        category: "Independiente",
        rating: { average: 9.2, story: 9, art: 9, edition: 9 },
    },
    {
        title: "Persépolis",
        style: "Europeo",
        author: "Marjane Satrapi",
        editorial: "Norma Editorial",
        volume: 1,
        chapters: 4,
        year: 2000,
        pages: 153,
        description: "Autobiografía gráfica sobre la infancia y adolescencia de la autora durante la revolución islámica iraní.",
        status: ComicStatus.WANTED,
        coverImage: "https://upload.wikimedia.org/wikipedia/en/6/6f/Persepolis.jpg",
        amazonLink: "https://amazon.es/persepolis",
        // previewImages: [
        //     "https://upload.wikimedia.org/wikipedia/en/6/6f/Persepolis.jpg",
        // ],
        category: "Europeo",
        rating: { average: 9.0, story: 9, art: 9, edition: 9 },
    },
    {
        title: "Dragon Ball Vol. 1",
        style: "Manga",
        author: "Akira Toriyama",
        editorial: "Planeta Cómic",
        volume: 1,
        chapters: 7,
        year: 1984,
        pages: 192,
        description: "La aventura de Son Goku en busca de las bolas de dragón que conceden cualquier deseo.",
        status: ComicStatus.OWNED,
        coverImage: "https://upload.wikimedia.org/wikipedia/en/5/5b/Dragon_Ball_Volume_1_Viz_Media.jpg",
        amazonLink: "https://amazon.es/dragonball",
        // previewImages: [
        //     "https://upload.wikimedia.org/wikipedia/en/5/5b/Dragon_Ball_Volume_1_Viz_Media.jpg",
        // ],
        category: "Manga",
        rating: { average: 9.3, story: 9, art: 9, edition: 10 },
    },
    {
        title: "V de Vendetta",
        style: "Americano",
        author: "Alan Moore",
        editorial: "ECC Ediciones",
        volume: 1,
        chapters: 10,
        year: 1988,
        pages: 296,
        description: "En una Inglaterra fascista del futuro, un misterioso anarquista enmascarado lucha contra el régimen totalitario.",
        status: ComicStatus.PENDING,
        coverImage: "https://upload.wikimedia.org/wikipedia/en/0/0f/V_for_Vendetta_Vol_1_1.jpg",
        amazonLink: "https://amazon.es/v-vendetta",
        // previewImages: [
        //     "https://upload.wikimedia.org/wikipedia/en/0/0f/V_for_Vendetta_Vol_1_1.jpg",
        // ],
        category: "Americano",
        rating: { average: 9.1, story: 10, art: 8, edition: 9 },
    },
];

mongoose
    .connect(db.DB_URL)
    .then(async () => {
        const allComics = await Comic.find();

        if (allComics.length) {
            console.log("Deleting comics collection...");
            await Comic.collection.drop();
            console.log("Comics collection deleted successfully.");
        } else {
            console.log("No existing comics found, preparing to seed...");
        }
    })
    .catch((error: unknown) => console.log("There was an error when deleting comics.", error))
    .then(async () => {
        await Comic.insertMany(comicData);
        console.log("Comics added successfully!");
    })
    .catch((error: unknown) => console.log("Error adding comics to database", error))
    .finally(() => {
        mongoose.disconnect();
        console.log("Disconnected from MongoDB.");
    });