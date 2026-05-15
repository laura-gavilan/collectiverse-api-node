export type VinylFormat = "LP" | "EP" | "Single" | "Maxi-Single";

export type VinylRating = {
    average: number;
    sound: number;
    edition: number;
};

export enum VinylStatus {
    OWNED = "owned",
    WANTED = "wanted",
    PENDING = "pending"
}

export type Vinyl = {
    id: string;
    title: string;
    artist: string;
    label: string;    // Sello discográfico
    format: VinylFormat;
    year: number;
    tracks: number;
    description: string;
    status: VinylStatus;
    coverImage: string;
    category: string;
    amazonLink: string;
    rating?: VinylRating;
};