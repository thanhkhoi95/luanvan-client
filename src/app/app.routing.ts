import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', redirectTo: 'customer', pathMatch: 'full' },
  { path: 'customer', loadChildren: 'app/customer/customer.module#CustomerModule' },
  { path: 'kitchen', loadChildren: 'app/kitchen/kitchen.module#CustomerModule' },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
