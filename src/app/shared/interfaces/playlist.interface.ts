import { Track } from "./track.interface";
import { User } from "./user.interface";

export interface Playlist{
    _id?: string;
    name: string;
    description: string;
    image: string;
    source: string;
    tracks: Track[];
    owner?: User;
}