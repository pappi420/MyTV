export interface Movie {
  id: number;
  title: string;
  year: string;
  rating: string | number;
  poster: string;
  backdrop?: string;
  overview?: string;
  runtime?: number;
  genres?: {
    id: number;
    name: string;
  }[];
}