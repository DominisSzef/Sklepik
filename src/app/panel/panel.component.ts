import {Component, OnInit} from '@angular/core';
import { ProductService } from '../shared/interfaces/product.service';
import {FormsModule} from '@angular/forms';
import {Zamowienia} from '../shared/interfaces/product';
import {DatePipe, NgForOf} from '@angular/common';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  imports: [
    FormsModule,
    NgForOf,
    DatePipe
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
    //  console.log(this.orders);
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
      // Po udanym usunięciu, usuń zamówienie z listy w komponencie
      this.orders = this.orders.filter(order => order.id !== orderId);
      alert('Zamówienie zostało usunięte!');
    }
    );
  }




}
