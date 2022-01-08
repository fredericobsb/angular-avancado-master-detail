import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError, flatMap} from "rxjs/operators";
import { Entry } from './entry.model';
import { CategoryService } from '../../categories/shared/category.service';


@Injectable({
  providedIn: 'root'
})
export class EntryService {

  private apiPath: string = "api/entries";

  constructor(private http: HttpClient, 
              private categoryService: CategoryService) { }

  getAll(): Observable<Entry[]>{
    //o pipe é para tratar o retorno
    return this.http.get(this.apiPath).pipe(
        catchError(this.handleError),
        map(this.jsonDataToEntries)
    )
  }

  getById(id: number): Observable<Entry>{
      const url = `${this.apiPath}/${id}`;
      return this.http.get(url).pipe(
        catchError(this.handleError),
        map(this.jsonDataToEntry)
      )
  }

  /*
     FLAT MAP -> Usado aqui para achatar 2 Observables num só. 
     Se usar API externa, ao inves do in-memory-database.ts, não precisa usar o flat map.
  */
  create(entry: Entry): Observable<Entry>{
    return this.categoryService.getById(entry.categoryId).pipe(
      flatMap(category => {
        entry.category = category;

        return this.http.post(this.apiPath, entry).pipe(
          catchError(this.handleError),
          map(this.jsonDataToEntry)
        )
      })
    )
  }

  update(entry: Entry): Observable<Entry>{
    const url = `${this.apiPath}/${entry.id}`;

    return this.categoryService.getById(entry.categoryId).pipe(
      flatMap(category => {
        entry.category = category;

        return this.http.put(url, entry).pipe(
          catchError(this.handleError),
          map(() => entry)
        )
      })
    )
  }

  delete(id:number):Observable<any>{
      const url = `${this.apiPath}/${id}`;
      return this.http.delete(url).pipe(
        catchError(this.handleError),
        map(() => null)
      )
  }

  //metodos privados
  private jsonDataToEntries(jsonData: any[]): Entry[]{
      const entries: Entry[] = [];
      jsonData.forEach(element => {
        //Ao inves de ser "proto", Cria um objeto do tipo Entry.
        const entry = Object.assign(new Entry(), element);
        entries.push(entry);
      });
     return entries;
  }

  private handleError(error: any): Observable<any>{
      console.log("DEU PAU NA REQUISICAO => ", error);
      return throwError(error);
  }

  private jsonDataToEntry(jsonData: any): Entry{
    return Object.assign(new Entry(), jsonData);
  }
  
}
