import mongoose from "mongoose";
import db from "../../config/db.js";
import { Vinyl } from "./vinyls.model.js";
import { VinylStatus } from "./vinyls.types.js";


const vinylData = [
    {
        title: "The Dark Side of the Moon",
        artist: "Pink Floyd",
        label: "Harvest Records",
        format: "LP",
        year: 1973,
        tracks: 10,
        description: "Uno de los álbumes más vendidos de la historia. Explora temas como el tiempo, la codicia y la salud mental con un sonido progresivo único.",
        categories: "Rock",
        status: VinylStatus.OWNED,
        coverImage: "https://upload.wikimedia.org/wikipedia/en/3/3b/Dark_Side_of_the_Moon.png",
        amazonLink: "https://amazon.es/dark-side-moon",
        rating: { average: 9.8, sound: 10, edition: 9 },
    },
    {
        title: "Kind of Blue",
        artist: "Miles Davis",
        label: "Columbia Records",
        format: "LP",
        year: 1959,
        tracks: 5,
        description: "El álbum de jazz más vendido de todos los tiempos. Un punto de inflexión en la historia del jazz modal.",
        category: "Jazz",
        status: VinylStatus.OWNED,
        coverImage: "https://upload.wikimedia.org/wikipedia/en/9/9c/Davis_KindofBlue.jpg",
        amazonLink: "https://amazon.es/kind-of-blue",
        rating: { average: 9.7, sound: 10, edition: 9 },
    },
    {
        title: "Thriller",
        artist: "Michael Jackson",
        label: "Epic Records",
        format: "LP",
        year: 1982,
        tracks: 9,
        description: "El álbum más vendido de la historia de la música. Fusiona pop, funk, rock y R&B con una producción revolucionaria.",
        category: "Pop",
        status: VinylStatus.WANTED,
        coverImage: "https://upload.wikimedia.org/wikipedia/en/5/55/Michael_Jackson_-_Thriller.png",
        amazonLink: "https://amazon.es/thriller",
        rating: { average: 9.5, sound: 9, edition: 10 },
    },
    {
        title: "Homework",
        artist: "Daft Punk",
        label: "Virgin Records",
        format: "LP",
        year: 1997,
        tracks: 16,
        description: "Debut de Daft Punk que definió el house francés. Da funk, Around the World... un clásico instantáneo de la electrónica.",
        category: "Electrónica",
        status: VinylStatus.OWNED,
        coverImage: "https://upload.wikimedia.org/wikipedia/en/8/8a/Daft_Punk_Homework.jpg",
        amazonLink: "https://amazon.es/homework-daftpunk",
        rating: { average: 9.1, sound: 9, edition: 9 },
    },
    {
        title: "Abbey Road",
        artist: "The Beatles",
        label: "Apple Records",
        format: "LP",
        year: 1969,
        tracks: 17,
        description: "El penúltimo álbum de estudio de The Beatles. Contiene algunas de sus composiciones más elaboradas y el icónico medley del lado B.",
        category: "Rock",
        status: VinylStatus.PENDING,
        coverImage: "https://upload.wikimedia.org/wikipedia/en/4/42/Beatles_-_Abbey_Road.jpg",
        amazonLink: "https://amazon.es/abbey-road",
        rating: { average: 9.4, sound: 9, edition: 9 },
    },
    {
        title: "Illmatic",
        artist: "Nas",
        label: "Columbia Records",
        format: "LP",
        year: 1994,
        tracks: 10,
        description: "Debut de Nas considerado uno de los mejores álbumes de hip-hop de todos los tiempos. Retrato crudo y poético del Queensbridge de los 90.",
        category: "Hip-Hop",
        status: VinylStatus.WANTED,
        coverImage: "https://upload.wikimedia.org/wikipedia/en/5/50/Illmatic.jpg",
        amazonLink: "https://amazon.es/illmatic",
        rating: { average: 9.6, sound: 9, edition: 10 },
    },
];

mongoose
    .connect(db.DB_URL)
    .then(async () => {
        const allVinyls = await Vinyl.find();

        if (allVinyls.length) {
            console.log("Deleting vinyls collection...");
            await Vinyl.collection.drop();
            console.log("Vinyls collection deleted successfully.");
        } else {
            console.log("No existing vinyls found, preparing to seed...");
        }
    })
    .catch((error: unknown) => console.log("There was an error when deleting vinyls.", error))
    .then(async () => {
        await Vinyl.insertMany(vinylData);
        console.log("Vinyls added successfully!");
    })
    .catch((error: unknown) => console.log("Error adding vinyls to database", error))
    .finally(() => {
        mongoose.disconnect();
        console.log("Disconnected from MongoDB.");
    });