import { Album } from "./album.interface";

export interface Track{
    _id?: string;
    name: string;
    duration: number;
    release_date: string;
    file: string;
    genre: string[];
    album: Album [];
    key?: string;
    bpm?: number;
}