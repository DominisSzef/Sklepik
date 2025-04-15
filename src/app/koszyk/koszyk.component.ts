import { Component } from '@angular/core';
import { ProductService } from '../shared/interfaces/product.service';
import { Product, Zamowienia } from '../shared/interfaces/product';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-koszyk',
  templateUrl: './koszyk.component.html',
  styleUrls: ['./koszyk.component.css'],
  standalone: true,
  imports: [CommonModule],

})
export class KoszykComponent {
  cartItems: Product[] = [];

  constructor(private productService: ProductService) {
    this.productService.getCartItems().subscribe(items => {
      this.cartItems = items;
    });
  }

  removeFromCart(item: Product) {
    this.productService.removeFromCart(item);
  }

  placeOrder() {
    const newOrder: Zamowienia = {
      id: Date.now(),
      nazwa: `Zamówienie ${Date.now()}`,
      data: new Date()
    };

    this.productService.addNewOrder(newOrder).subscribe(() => {
      alert('Zamówienie zostało złożone!');
    });
  }
}
