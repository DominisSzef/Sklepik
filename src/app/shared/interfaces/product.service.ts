import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from './product';


@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private cartItems = new BehaviorSubject<Product[]>([]);
  cartItems$ = this.cartItems.asObservable();

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
}
