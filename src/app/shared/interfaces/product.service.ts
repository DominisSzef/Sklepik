import { Injectable } from '@angular/core';
import {BehaviorSubject, map, Observable, switchMap} from 'rxjs';
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
  public lastOrderId = 0;
  constructor(private http: HttpClient) {

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

  addNewOrder(order: Omit<Zamowienia, 'nazwa'>): Observable<Zamowienia> {
    return this.getOrders().pipe(
      // Fetch existing orders
      map((orders) => {
        // Find the highest order number
        const maxOrderNumber = orders.reduce((max, currentOrder) => {
          const match = currentOrder.nazwa.match(/Zamówienie (\d+)/);
          const orderNumber = match ? parseInt(match[1], 10) : 0;
          return Math.max(max, orderNumber);
        }, 0);

        // Create a new order with the next number
        const newOrder: Zamowienia = {
          ...order,
          nazwa: `Zamówienie ${maxOrderNumber + 1}`,
        };
        return newOrder;
      }),
      // Post the new order to the server
      switchMap((newOrder) => this.http.post<Zamowienia>(this.apiUrlOrder, newOrder))
    );
  }
  // addNewOrder(order: Omit<Zamowienia, 'id' | 'nazwa'>): Observable<Zamowienia> {
  //   const newOrder: Zamowienia = {
  //     ...order,
  //     id: ++this.lastOrderId, // Increment and assign the ID
  //     nazwa: `Zamówienie ${this.lastOrderId}` // Include the ID in the name
  //   };
  //   return this.http.post<Zamowienia>(this.apiUrlOrder, newOrder);
  // }

  // addNewOrder(newOrder: Omit<Zamowienia, 'id'>): Observable<Zamowienia> {
  //   const order: Zamowienia = {
  //     id: ++this.lastOrderId,
  //     nazwa: newOrder.nazwa,  // Dodajemy 'nazwa'
  //     data: newOrder.data     // Dodajemy 'data'
  //   };
  //   return this.http.post<Zamowienia>(this.apiUrlOrder, order);
  // }



  getOrders(): Observable<Zamowienia[]> {
    return this.http.get<Zamowienia[]>(this.apiUrlOrder);
  }
  removeOrder(orderId: number): Observable<any> {
    console.log(`Wysyłam żądanie DELETE do: http://localhost:3001/Zamowienia/${orderId}`);
    return this.http.delete(`${this.apiUrlOrder}/${orderId}`);
  }




}
