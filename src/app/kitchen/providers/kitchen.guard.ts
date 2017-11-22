import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LocalStorageService } from 'angular-2-local-storage/dist/local-storage.service';

@Injectable()
export class KitchenGuardService implements CanActivate {

    constructor(private localStorage: LocalStorageService,
        private router: Router) { }

    canActivate() {
        const token = this.localStorage.get('token');
        if (token) {
            return true;
        } else {
            this.router.navigate(['/login']);
            return false;
        }
    }
}
