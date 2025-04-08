export interface Product {
  id: number;
  nazwa: string;
  cena: number;
  opis: string;
  category: number; // Matches the property in db.json
}
