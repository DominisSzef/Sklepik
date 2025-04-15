import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { Product } from '../shared/interfaces/product';
import {NgForOf, NgOptimizedImage} from '@angular/common';
import { ProductService } from '../shared/interfaces/product.service'; // Import ProductService

@Component({
  selector: 'app-produkty',
  templateUrl: './produkty.component.html',
  styleUrls: ['./produkty.component.css'],
  standalone: true,
  imports: [HttpClientModule, NgForOf, NgOptimizedImage]
})
export class ProduktyComponent implements OnInit {
  products: Product[] = [];
  selectedItems: Product[] = [];

  constructor(private http: HttpClient, private productService: ProductService) {} // Inject ProductService

  ngOnInit() {
    // Fetch all products from the API
    this.http.get<Product[]>('http://localhost:3000/JedzenieiCzesciSamochodowe').subscribe((data) => {
      this.products = data;
      this.selectedItems = data;
    });
  }

  selectCategory(category: number) {
    this.selectedItems = this.products.filter(item => item.category === category);
  }

  kup(item: Product) {
    this.productService.addToCart(item); // Add item to cart
    console.log('Kupiono:', item.nazwa);
  }
}
