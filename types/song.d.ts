export interface Song {
  title: string;
  subtitle?: string;
  authors: string[];
  key?: string;
  tempo?: string;
  tags?: { [key:string]: { open: string, close: string } };
  lyrics: {
    name: string;
    lines: string[];
    es?: string[];
    en?: string[];
    fr?: string[];
  }[]
  order?: string;
}
