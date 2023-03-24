export interface StreamState {
    playing: boolean;
    readableCurrentTime: string; // легкое читаемое человеком (для отображения)
    readableDuration: string; // легкое читаемое человеком (для отображения)
    duration: number | undefined;
    currentTime: number | undefined;
    canplay: boolean;
    error: boolean;
    trackId: string;
    trackName: string;
    artistNames: string[];
}
