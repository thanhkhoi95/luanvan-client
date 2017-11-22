import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LocalStorageService } from 'angular-2-local-storage/dist/local-storage.service';

@Injectable()
export class OrderGuardService implements CanActivate {

    constructor(private localStorage: LocalStorageService,
        private router: Router) { }

    canActivate() {
        const table = this.localStorage.get('table');
        if (table) {
            if (this.localStorage.get('order')) {
                this.router.navigate(['/bill']);
                return false;
            }
            return true;
        } else {
            this.router.navigate(['/welcome']);
            return false;
        }
    }
}
