import { Component, OnInit, AfterContentChecked, Injector } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Entry} from '../shared/entry.model';
import {EntryService} from '../shared/entry.service';
import {switchMap} from 'rxjs/operators';
import toastr from "toastr";
import { Category } from '../../categories/shared/category.model';
import { CategoryService } from '../../categories/shared/category.service';
import { BaseResourceFormComponent } from 'src/app/shared/components/base-resource-form/base-resource-form.component';


@Component({
  selector: 'app-entry-form',
  templateUrl: './entry-form.component.html',
  styleUrls: ['./entry-form.component.css']
})
export class EntryFormComponent extends BaseResourceFormComponent<Entry> implements OnInit{

  categories: Array<Category>;

  imaskConfig = {
    mask: Number,
    scale: 2,//quantidade de casas apos a virgula
    thousandsSeparator: '',
    padFractionalZeros: true,//se a pessoa digitar 20, ele completará com 20.00
    normalizeZeros: true,
    radix: ','//separador de decimais
  };

  ptBR = {
    firstDayOfWeek:0,
    dayNames:['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sabado'],
    dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
    dayNamesMin:['Do', 'Se', 'Te', 'Qu','Qu', 'Se', 'Sa'],
    monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
    monthNamesShort:['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    today: 'Hoje',
    clear: 'Limpar'
  }

  constructor(
    protected entryService: EntryService,
    protected injector: Injector,
    protected categoryService: CategoryService
  ) { 
    super(injector, new Entry(), entryService, Entry.fromJson);
  }

  ngOnInit() {
    this.loadCategories();
    super.ngOnInit();
  }

  get typeOptions(): Array<any>{
    return Object.entries(Entry.types).map(
      ([value, text]) => {
        return {
          text: text,
          value: value
        }
      }
    )
  }

  private loadCategories(){
     this.categoryService.getAll().subscribe(
       categories => this.categories = categories
     );
  }

  protected creationPageTitle(): string {
      return "Cadastro de Novo Lançamento";
  }

  protected editionPageTitle(): string {
      const resourceName = this.resource.name || "";
      return "Editando Lançamento :" + resourceName;
  }

  protected buildResourceForm(){
    this.resourceForm = this.formBuilder.group({
      id: [null],
      name: [null, [Validators.required, Validators.minLength(2)]],
      description: [null,[Validators.required]],
      type: ["expense",[Validators.required]],
      amount: [null, [Validators.required]],
      date: [null, [Validators.required]],
      paid: [true, [Validators.required]],
      categoryId: [null, [Validators.required]]
    });
  }

}
