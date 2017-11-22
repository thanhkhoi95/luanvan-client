import { Observable } from 'rxjs/Observable';
import { HttpInterceptor } from '@angular/common/http/src/interceptor';
import { Injectable, Inject } from '@angular/core';
import { HttpRequest } from '@angular/common/http';
import { HttpHandler } from '@angular/common/http';
import { HttpEvent } from '@angular/common/http';
import { InjectionToken } from '@angular/core';

@Injectable()
export class ApiUrlInterceptor implements HttpInterceptor {
  constructor( @Inject(API_URL) private apiUrl: string) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token = localStorage.getItem('res.token') || '';
    token = token.replace('"', '').replace('"', '');
    req = req.clone({
      url: this.prepareUrl(req.url), setHeaders: {
        'x-access-token': token
      }
      // url: this.prepareUrl(req.url)
    });
    return next.handle(req);
  }

  private isAbsoluteUrl(url: string): boolean {
    const absolutePattern = /^https?:\/\//i;
    return absolutePattern.test(url);
  }

  private prepareUrl(url: string): string {
    url = this.isAbsoluteUrl(url) ? url : this.apiUrl + '/' + url;
    return url.replace(/([^:]\/)\/+/g, '$1');
  }
}

export const API_URL = new InjectionToken<string>('apiUrl');
