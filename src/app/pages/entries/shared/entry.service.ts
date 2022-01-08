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

  /*
    Passar o nome da função sem ( ) não executa a função, apenas diz que essa função
    deverá ser executada quando for solicitado: Entry.fromJson.

    Entry.fromJson -> converte um json em um objeto Entry.
  */
  constructor(protected injector: Injector, 
              private categoryService: CategoryService) { 
                super("api/entries", injector, Entry.fromJson);
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
}
