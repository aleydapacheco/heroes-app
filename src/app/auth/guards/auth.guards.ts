import { AuthService } from 'src/app/auth/services/auth.service';
import { Injectable, } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanMatch, Route, Router, RouterStateSnapshot, UrlSegment } from '@angular/router';
import { Observable, of } from 'rxjs';
import { tap, map } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanMatch , CanActivate {
    
    constructor( 
        private authService: AuthService,
        private router: Router,
    ) { }

    private checkAuthStatus(): boolean | Observable<boolean> {
        return this.authService.checkAuthentication()
        .pipe(
                tap( isAuthenticated => console.log( 'Authenticated:', isAuthenticated )),
                tap( isAuthenticated => {
                    if ( !isAuthenticated ){
                        this.router.navigate(['./auth/login'])
                    }
                })
            )
    }

    canMatch( route: Route, segments: UrlSegment[]):boolean | Observable<boolean> {
        //console.log('Can Match');
        console.log({ route, segments });
        //return false;
        return this.checkAuthStatus();
    }

    canActivate( route: ActivatedRouteSnapshot, state:RouterStateSnapshot ): boolean | Observable<boolean> {
        //console.log('Can Activate');
        console.log({ route ,state });
        //return false;
        return this.checkAuthStatus();
    }
    
}