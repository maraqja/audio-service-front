export interface Album{
    _id?: string;
    title: string;
    description: string;
    image: string;
    release_date: string;
    genre: string[];
    artists: Album[]
}