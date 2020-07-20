import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from "@angular/common/http";
import { Observable } from "rxjs";

import { AuthService as AuthenticationService } from "@app/core/services/auth.service";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(public authenticationService: AuthenticationService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available

    let user = this.authenticationService.userValue;
    const idToken = localStorage.getItem("access_token");
    if (user) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${user.access_token}`,
        },
      });
    }

    return next.handle(request);
  }
}
