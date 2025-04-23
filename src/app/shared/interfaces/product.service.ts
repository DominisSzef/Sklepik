import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {Product, Zamowienia} from './product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
   private apiUrl = 'http://localhost:3000/JedzenieiCzesciSamochodowe'; // Path to db.json
  private apiUrlOrder = 'http://localhost:3000/Zamowienia';
  private cartItems = new BehaviorSubject<Product[]>([]);
  cartItems$ = this.cartItems.asObservable();
  private lastOrderId = 0;

  constructor(private http: HttpClient) {
    this.http.get<Zamowienia[]>(this.apiUrlOrder).subscribe((orders) => {
      if (orders.length > 0) {
        this.lastOrderId = Math.max(
          ...orders.map((order) => order.id).filter((id): id is number => id !== undefined)
        );
      }
    });
  }

  addToCart(item: Product) {
    const currentItems = this.cartItems.value;
    this.cartItems.next([...currentItems, item]);
  }

  removeFromCart(item: Product) {
    const updatedItems = [...this.cartItems.value];
    const index = updatedItems.findIndex(cartItem => cartItem === item);
    if (index > -1) {
      updatedItems.splice(index, 1);
      this.cartItems.next(updatedItems);
    }
  }

  getCartItems() {
    return this.cartItems$;
  }


  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product);
  }
  addNewOrder(order: Omit<Zamowienia, 'id' | 'nazwa'>): Observable<Zamowienia> {
    const newOrder: Zamowienia = {
      ...order,
      id: ++this.lastOrderId, // Increment and assign the ID
      nazwa: `Zamówienie ${this.lastOrderId}` // Include the ID in the name
    };
    return this.http.post<Zamowienia>(this.apiUrlOrder, newOrder);
  }
  getOrders(): Observable<Zamowienia[]> {
    return this.http.get<Zamowienia[]>(this.apiUrlOrder);
  }
  removeOrder(orderId: number) {
    return this.http.delete(`${this.apiUrlOrder}?id=${orderId}`);
  }



}
