import { FoodHttpService } from './providers/food-http.service';
import { NgModule } from '@angular/core';
import { CustomerModule } from './customer/customer.module';
import { KitchenModule } from './kitchen/kitchen.module';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from '../environments/environment.prod';
import { API_URL, ApiUrlInterceptor } from './providers/api-intercepter';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LocalStorageModule, LocalStorageService } from 'angular-2-local-storage';
import { TableHttpService } from './providers/table-http.service';
import { OrderHttpService } from './providers/order-http.service';
import { AuthService } from './providers/auth.service';
import { SocketService } from './providers/socket.service';
import { LoginComponent } from './login/login.component';
import { AuthState } from './providers/auth.state';
import { FormsModule } from '@angular/forms';
import { StaffModule } from './staff/staff.module';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CustomerModule,
    KitchenModule,
    StaffModule,
    AppRoutingModule,
    FormsModule,
    LocalStorageModule.withConfig({
      prefix: 'res',
      storageType: 'localStorage'
  })
  ],
  providers: [
    LocalStorageService,
    { provide: API_URL, useValue: environment.apiUrl },
    { provide: HTTP_INTERCEPTORS, useClass: ApiUrlInterceptor, multi: true, deps: [API_URL] },
    TableHttpService,
    OrderHttpService,
    FoodHttpService,
    SocketService,
    AuthService,
    AuthState
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
