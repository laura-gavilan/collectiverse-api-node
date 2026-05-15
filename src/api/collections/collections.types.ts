
export enum CollectionStatus {
    OWNED = "owned",
    WANTED = "wanted",
    MISSING = "missing",
    PENDING = "pending"
} 
export type CollectionItem = {
    id: string;
    userId: string;
    collectionType: "Comic" | "Vinyl"
    status: CollectionStatus;
    addedAt: Date;
};

export interface ComicCollection extends CollectionItem {
    collectionType: "Comic",
    read: Boolean;
};

export interface VinylCollection extends CollectionItem {
    collectionType: "Vinyl",
    played: Boolean;
};