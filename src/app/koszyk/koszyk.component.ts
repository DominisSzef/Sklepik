import { Component, OnInit } from '@angular/core';
import { ProductService } from '../shared/interfaces/product.service'; // Adjusted path
import { Product } from '../shared/interfaces/product';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-koszyk',
  templateUrl: './koszyk.component.html',
  styleUrls: ['./koszyk.component.css'],
  imports: [
    NgForOf
  ]
})
export class KoszykComponent implements OnInit {
  cartItems: Product[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.getCartItems().subscribe((items: Product[]) => { // Explicit type for 'items'
      this.cartItems = items;
    });
  }

  removeFromCart(item: Product) {
    this.productService.removeFromCart(item);
  }
}
