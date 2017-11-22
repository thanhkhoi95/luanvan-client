import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LocalStorageService } from 'angular-2-local-storage/dist/local-storage.service';

@Injectable()
export class BillGuardService implements CanActivate {

    constructor(private localStorage: LocalStorageService,
        private router: Router) { }

    canActivate() {
        const table = this.localStorage.get('table');
        const order = this.localStorage.get('order');
        if (table && order) {
            return true;
        } else {
            this.router.navigate(['/welcome']);
            return false;
        }
    }
}
