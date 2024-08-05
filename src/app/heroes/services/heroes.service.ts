import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, of , map, Observable} from 'rxjs'; 

import { Hero } from '../interfaces/hero.interface';
import { environments } from 'src/environments/environments';



@Injectable({providedIn: 'root'})

export class HeroesService {
    private baseUrl: string = environments.baseUrl;
    constructor(private http: HttpClient) { }
  
    //Metodo para solivcitar toda la informacion de los Heroes
    getHeroes():Observable<Hero[]> {
      return this.http.get<Hero[]>(`${ this.baseUrl }/heroes`);
    }
  
    //Metodo para solicitar la informacion de un Heroe segun su ID
    getHeroById( id: string ): Observable<Hero|undefined> {
      return this.http.get<Hero>(`${ this.baseUrl }/heroes/${ id }`)
        .pipe(
          catchError( error => of(undefined) )
        );
    }
    
    //Metodo para asignar Sugerencias de resultados en "Barra de Busqueda"
    getSuggestions( query: string ): Observable<Hero[]> {
      return this.http.get<Hero[]>(`${ this.baseUrl }/heroes?q=${ query }&_limit=6`);
    }

    //Metodo para anadir un heroe a la data
    addHero( hero: Hero ): Observable<Hero> {
      console.log('Add Hero!');
      return this.http.post<Hero>(`${ this.baseUrl }/heroes`, hero );
    }

    //Metodo para actualizar un heroe segun su ID
    updateHero( hero: Hero ): Observable<Hero> {
      console.log('Update Hero!');
      if ( !hero.id ) throw Error('Hero id is required');
      return this.http.patch<Hero>(`${ this.baseUrl }/heroes/${ hero.id }`, hero );
    }

    //Metodo para eliminar un heroe segun su ID
    
    deleteHeroById( id: string ): Observable<boolean> {
      console.log('Delete Hero!');
      return this.http.delete(`${ this.baseUrl }/heroes/${ id }`)
        .pipe(
          map( resp => true ),
          catchError( err => of(false) ),
        );
    }
}