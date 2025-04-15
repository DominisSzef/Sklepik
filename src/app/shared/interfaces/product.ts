export interface Product {
  id?: number;
  nazwa: string;
  cena: number;
  opis: string;
  category: number;
  imageUrl: string;
}
export interface Zamowienia{
  id: number;
  nazwa: string;
  data: Date;
}
