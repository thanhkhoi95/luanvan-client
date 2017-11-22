import { SocketService } from './../../providers/socket.service';
import { LocalStorageService } from 'angular-2-local-storage';
import { Router } from '@angular/router';
import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { AuthState } from '../providers/auth.state';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewInit {

  @ViewChild('input') private inputElementRef: ElementRef;
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
      this.router.navigate(['kitchen/tables']);
    });
  }

}


