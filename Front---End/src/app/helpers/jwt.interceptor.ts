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
            console.log(finalToken)

            request = request.clone({
                        setHeaders: {
                            Authorization: finalToken
                        }
                    });
        }
        


        // // add auth header with jwt if user is logged in and request is to the api url
        // const user = this.accountService.userValue;
        // const isLoggedIn = user && user.token;
        // const isApiUrl = request.url.startsWith(environment.apiUrl);
        // if (isLoggedIn && isApiUrl) {
        //     request = request.clone({
        //         setHeaders: {
        //             Authorization: `Bearer ${user.token}`
        //         }
        //     });
        // }
        console.log("------------start------------")
                console.log(request)
        console.log("------------stop------------")
        return next.handle(request);
    }
}