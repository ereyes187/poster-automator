export interface AlbumObject {
  album_type: "album" | "single" | "compilation";
  total_tracks: number;
  id: string;
  images: ImageObject[];
  name: string;
  release_date: string;
  release_date_precision: "year" | "month" | "day";
  artists: SimplifiedArtistObject[];
  tracks: TracksObject;
}

export interface ImageObject {
  url: string;
  height: number | null;
  width: number | null;
}

export interface SimplifiedArtistObject {
  id: string;
  name: string;
}

export interface TracksObject {
  total: number;
  items: SimplifiedTrackObject[];
}

export interface SimplifiedTrackObject {
  artists: SimplifiedArtistObject[];
  duration_ms: number;
  id: string;
  name: string;
  track_number: number;
}
