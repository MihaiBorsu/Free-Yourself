import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from "../models/user";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor() { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {


        let token = <User>JSON.parse(localStorage.getItem('user'));
        
        if(token != null){
            let finalToken = "Bearer " + token.token

            request = request.clone({
                        setHeaders: {
                            Authorization: finalToken
                        }
                    });
        }
        

        return next.handle(request);
    }
}