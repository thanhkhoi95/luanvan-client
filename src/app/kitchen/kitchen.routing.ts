import { KitchenGuardService } from './providers/kitchen.guard';
import { LoginComponent } from './login/login.component';
import { KitchenComponent } from './kitchen.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrdersComponent } from './orders/orders.component';
import { TablesComponent } from './tables/tables.component';

const routes: Routes = [
    { path: 'login', component: LoginComponent },
    {
        path: 'kitchen', component: KitchenComponent,
        canActivate: [KitchenGuardService], children: [
            { path: 'tables', component: TablesComponent },
            { path: 'order/:id', component: OrdersComponent },
            { path: '', redirectTo: 'tables', pathMatch: 'full' }
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class KitchenRoutingModule { }

export const routedComponents = [KitchenComponent];
