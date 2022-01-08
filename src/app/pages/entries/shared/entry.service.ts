import { Injectable, Injector} from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError, flatMap} from "rxjs/operators";
import { Entry } from './entry.model';
import { CategoryService } from '../../categories/shared/category.service';
import { BaseResourceService } from 'src/app/shared/services/base-resource.service';


@Injectable({
  providedIn: 'root'
})
export class EntryService extends BaseResourceService<Entry>{

  constructor(protected injector: Injector, 
              private categoryService: CategoryService) { 
                super("api/entries", injector);
              }

  /*
     FLAT MAP -> Usado aqui para achatar 2 Observables num só. 
     Se usar API externa, ao inves do in-memory-database.ts, não precisa usar o flat map.
  */
  create(entry: Entry): Observable<Entry>{
    return this.categoryService.getById(entry.categoryId).pipe(
      flatMap(category => {
        entry.category = category;

        return super.create(entry)
      })
    )
  }

  update(entry: Entry): Observable<Entry>{

    return this.categoryService.getById(entry.categoryId).pipe(
      flatMap(category => {
        entry.category = category;

        return super.update(entry)
      })
    )
  }

 
  //metodos privados
  protected jsonDataResources(jsonData: any[]): Entry[]{
      const entries: Entry[] = [];
      jsonData.forEach(element => {
        //Ao inves de ser "proto", Cria um objeto do tipo Entry.
        const entry = Entry.fromJson(element);
        entries.push(entry);
      });
     return entries;
  }

  
  protected jsonDataToResource(jsonData: any): Entry{
    return  Entry.fromJson(jsonData);
  }
  
}
