// types.ts

export interface MangaAttributes {
    title: string;
    coverArt: string | null;
  }
  
  export interface Manga {
    id: string;
    attributes: MangaAttributes;
  }
  
  export interface MangaResponse {
    data: Manga[];
  }
  