import { Routes } from '@angular/router';
import { ProduktyComponent } from './produkty/produkty.component';
import { KoszykComponent } from './koszyk/koszyk.component';
import { PanelComponent } from './panel/panel.component';

export const routes: Routes = [
  { path: 'produkty', component: ProduktyComponent },
  { path: 'panel', component: PanelComponent },
  { path: '', redirectTo: '/produkty', pathMatch: 'full' }
];
