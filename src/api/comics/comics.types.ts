export type Style = "Europeo" | "Americano" | "Manga";

export type Rating = {
    average: number,
    story: number,
    art: number,
    edition: Number
};

export enum ComicStatus {
    OWNED = "owned",
    WANTED = "wanted",
    PENDING = "pending"
} 

export type Comic = {
    id: string,
    title: string,
    style: Style,
    author: string,
    editorial: string,
    volume: number,
    chapters: number,
    year: number,
    pages: number,
    description: string,
    status: ComicStatus,
    coverImage: string,
    amazonLink: string,
    // previewImages: string[], //varias imágenes del cómic, una previa 
    category: string,
    rating?: Rating
};