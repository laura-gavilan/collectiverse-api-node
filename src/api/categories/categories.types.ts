import { Request } from "express";

export type Category = {
    name: string,
    slug: string,
    collectionType: "Comic" | "Vinyl",
};



export type CustomRequest = Request & {
    propiedad?: string;
    http_info_log?: string;
};
