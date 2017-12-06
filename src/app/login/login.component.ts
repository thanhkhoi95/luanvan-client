import { SocketService } from './../providers/socket.service';
import { LocalStorageService } from 'angular-2-local-storage';
import { Router } from '@angular/router';
import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { AuthState } from '../providers/auth.state';
import { JwtHelper } from 'angular2-jwt';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewInit {

  @ViewChild('input') private inputElementRef: ElementRef;

  private jwtHelper: JwtHelper = new JwtHelper();

  constructor(private router: Router,
    private authState: AuthState,
    private localStorage: LocalStorageService,
    private socketService: SocketService) { }
  ngOnInit() {
    this.localStorage.clearAll();
  }

  ngAfterViewInit() {
    this.inputElementRef.nativeElement.focus();
  }

  onEnter(username: string, password: string) {
    this.authState.login(username, password).subscribe(token => {
      this.socketService.init(token, () => {
      });
      const user = this.jwtHelper.decodeToken(token as string);
      if (user.role === 'kitchen') {
        this.router.navigate(['kitchen/tables']);
      } else {
        this.router.navigate(['staff/tables']);
      }
    });
  }

}


