import { StaffGuardService } from './providers/staff.guard';
import { StaffComponent } from './staff.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrdersComponent } from './orders/orders.component';
import { TablesComponent } from './tables/tables.component';

const routes: Routes = [
    {
        path: 'staff', component: StaffComponent,
        canActivate: [StaffGuardService], children: [
            { path: 'tables', component: TablesComponent },
            { path: 'order/:id', component: OrdersComponent },
            { path: '', redirectTo: 'tables', pathMatch: 'full' }
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class StaffRoutingModule { }

export const routedComponents = [StaffComponent];
