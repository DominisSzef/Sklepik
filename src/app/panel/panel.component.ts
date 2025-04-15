import {Component, OnInit} from '@angular/core';
import { ProductService } from '../shared/interfaces/product.service';
import {FormsModule} from '@angular/forms';
import {Product, Zamowienia} from '../shared/interfaces/product';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  imports: [
    FormsModule,
    NgForOf
  ],
  styleUrls: ['./panel.component.css']
})
export class PanelComponent implements OnInit {
  orders: Zamowienia[] = [];
  newProduct = {
    nazwa: '',
    cena: 0,
    opis: '',
    category: 1,
    imageUrl:'znak.jpg'
  };

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.fetchOrders();

  }
  fetchOrders() {
    this.productService.getOrders().subscribe((orders: Zamowienia[]) => {
      this.orders = orders;
      console.log(this.orders);
    });
  }
  addProduct() {
    this.productService.addProduct(this.newProduct).subscribe(() => {
      alert('Produkt został dodany!');
      this.newProduct = { nazwa: '', cena: 0, opis: '', category: 1 ,imageUrl:'znak.jpg'}; // Reset formularza
    });
  }

  RemoveOrder(orderId: number) {
    this.productService.removeOrder(orderId).subscribe(() => {
      this.orders = this.orders.filter(order => order.id !== orderId); // Remove the order with the matching ID
      alert('Zamówienie zostało usunięte!');
    });
  }




}
