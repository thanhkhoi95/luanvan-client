import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LocalStorageService } from 'angular-2-local-storage/dist/local-storage.service';

@Injectable()
export class OrderGuardService implements CanActivate {

    constructor(private localStorage: LocalStorageService,
        private router: Router) { }

    canActivate() {
        console.log('asdf');
        const table = this.localStorage.get('table');
        if (!table) {
            this.router.navigate(['/welcome']);
            return false;
        }
        return true;
    }
}
