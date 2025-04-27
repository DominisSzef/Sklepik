import { Component, OnInit } from '@angular/core';
import { ProductService } from '../shared/interfaces/product.service';
import { Product, Zamowienia } from '../shared/interfaces/product';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-koszyk',
  templateUrl: './koszyk.component.html',
  styleUrls: ['./koszyk.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class KoszykComponent implements OnInit {
  cartItems: Product[] = [];
  order!: Zamowienia;

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.order = {

      nazwa: `Zamówienie ${this.productService.lastOrderId + 1}`,
      data: new Date(),
    };

    this.productService.getCartItems().subscribe((items) => {
      this.cartItems = items;
    });
  }

  removeFromCart(item: Product) {
    this.productService.removeFromCart(item);
  }

  placeOrder() {
    if (this.cartItems.length === 0) {
          alert('Koszyk jest pusty. Dodaj produkty przed złożeniem zamówienia.');
          return;
        }
    this.productService.addNewOrder(this.order).subscribe(() => {
      alert('Produkt został dodany!');
      this.order = {

        nazwa: `Zamówienie ${this.productService.lastOrderId + 1}`,
        data: new Date(),
      };
    });
  }


  // placeOrder() {
  //   if (this.cartItems.length === 0) {
  //     alert('Koszyk jest pusty. Dodaj produkty przed złożeniem zamówienia.');
  //     return;
  //   }
  //
  //   const newOrder: Omit<Zamowienia, 'id'> = {
  //     nazwa: `Zamówienie ${this.productService.lastOrderId + 1}`, // Use the next ID for the name
  //     data: new Date()
  //   };
  //
  //   this.productService.addNewOrder(newOrder).subscribe(() => {
  //     alert('Zamówienie zostało złożone!');
  //     this.productService.getOrders().subscribe(orders => {
  //       console.log('Odświeżone zamówienia:', orders);
  //     });
  //   });
  // }
}
