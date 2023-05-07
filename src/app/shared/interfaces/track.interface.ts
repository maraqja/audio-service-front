import { Album } from "./album.interface";

export interface Track{
    _id?: string;
    name: string;
    description: string;
    duration: number;
    file: string;
    genre: string[];
    album: Album;
    key?: string;
    bpm?: number;
}