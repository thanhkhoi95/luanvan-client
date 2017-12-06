import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LocalStorageService } from 'angular-2-local-storage/dist/local-storage.service';
import { JwtHelper } from 'angular2-jwt';

@Injectable()
export class StaffGuardService implements CanActivate {

    private jwtHelper: JwtHelper = new JwtHelper();

    constructor(private localStorage: LocalStorageService,
        private router: Router) { }

    canActivate() {
        const token = this.localStorage.get('token');
        if (token) {
            const user = this.jwtHelper.decodeToken(token as string);
            if (user.role === 'staff') {
                return true;
            } else {
                return false;
            }
        } else {
            this.router.navigate(['/login']);
            return false;
        }
    }
}
