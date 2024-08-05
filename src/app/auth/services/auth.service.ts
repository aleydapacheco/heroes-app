import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environments } from 'src/environments/environments';
import { User } from '../interfaces/user.interface';
import { catchError, Observable, tap, map, of } from 'rxjs';


@Injectable({providedIn: 'root'})
export class AuthService {
    private baseUrl = environments.baseUrl;
    private user?: User | null = null;

    constructor(private http: HttpClient) { }
    
    get currentUser() :User | undefined {
        if (!this.user) return undefined;
        return structuredClone( this.user );
    }

    login (email:string, password: string ):Observable<User> {
        //http.post('urlLogin',{email, password});
        return this.http.get<User>(`${ this.baseUrl }/users/`)
            .pipe(
                tap( user => { this.user = user }),
                tap( user => localStorage.setItem('token', 'skdjcnksjdbc12')),
            );
    }

    checkAuthentication(): Observable<boolean>{
        if (!localStorage.getItem('token')) return of(false);
        const token = localStorage.getItem('token');
        return this.http.get<User>(`${ this.baseUrl }/users/`)
            .pipe(                
                tap( user => {
                    console.log(user);
                    this.user = user;
                }),
                map( user => !!user),
                catchError( err => of(false))
            );
    }

    logout() {
       this.user = undefined;
       localStorage.clear();
    }
}