import { HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { filter, map, Observable } from "rxjs";
import { PostModel } from "./post.model";

@Injectable({ providedIn: 'root' })
export class HttpInterceptorService implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const API_KEY = '132';
        return next.handle(request.clone({setHeaders: { API_KEY }}));
        //     pipe(filter(event => event instanceof HttpResponse && request.url.includes('format')),
        //     map((event: HttpResponse<any>) => event.clone({body: event.body}))
        //     );
        //return next.handle(request);

        // return next.handle(request.clone({setHeaders: { API_KEY }})).
        //     pipe(map((event ) => {
        //         //if (event instanceof HttpResponse) {
        //             const postArray: PostModel[] = [];
        //             for (const key in event) {
        //                 if (event.hasOwnProperty(key)) {
        //                   postArray.push({...event[key], id: key});
        //                 }
        //               };
        //             return event.body;
        //         //}
        //     }));
    }
    
}