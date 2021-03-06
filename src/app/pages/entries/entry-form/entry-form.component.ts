import { Component, OnInit, AfterContentChecked } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Entry} from '../shared/entry.model';
import {EntryService} from '../shared/entry.service';
import {switchMap} from 'rxjs/operators';
import toastr from "toastr";


@Component({
  selector: 'app-entry-form',
  templateUrl: './entry-form.component.html',
  styleUrls: ['./entry-form.component.css']
})
export class EntryFormComponent implements OnInit, AfterContentChecked {

  currentAction: string;
  entryForm: FormGroup;
  pageTitle: string;
  serverErrorMessages: string[] = null;
  submittingForm: boolean = false;
  entry: Entry = new Entry();
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
    private entryService: EntryService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.setCurrentAction();
    this.buildEntryForm();
    this.loadEntry();
  }

  ngAfterContentChecked(){

  }

  submitForm(){
    this.submittingForm = true;
    if(this.currentAction == "new")
        this.createEntry();
    else
        this.updateEntry();
  }

  //metodos privados
  private setCurrentAction(){
   if(this.route.snapshot.url[0].path == "new"){
     this.currentAction = "new";
   } 
   else{
     this.currentAction = "edit";
   }
  }

  private buildEntryForm(){
    this.entryForm = this.formBuilder.group({
        id:[null],
        name: [null, [Validators.required, Validators.minLength(2)]],
        description: [null],
        type: [null, [Validators.required]],
        amount:[null, [Validators.required]],
        date:[null, [Validators.required]],
        paid:[null, [Validators.required]],
        categoryId: [null, [Validators.required]]
    });
  }

  private loadEntry(){
    if(this.currentAction == "edit"){
       this.route.paramMap.pipe(
            switchMap(params => this.entryService.getById(+ params.get("id")))
       )
       .subscribe(
         (entry) => {
              this.entry = entry;
              this.entryForm.patchValue(entry)
         },
         (error) => alert('Deu pau!')
       )
    }
  }

  private setPageTitle(){
    if(this.currentAction == "new"){
      this.pageTitle = "Cadastro de nova categoria";
    }
    else{
      const entryName = this.entry.description || ""
      this.pageTitle = "Editando categoria: " + entryName;
    }
  }

  private createEntry(){
      const entry: Entry = Object.assign(new Entry(), this.entryForm.value);

      this.entryService.create(entry)
          .subscribe(
              entry => this.actionForSuccess(entry),
              error => this.actionsForError(error)
          )
  }

  private updateEntry(){
    const entry: Entry = Object.assign(new Entry(), this.entryForm.value);

    this.entryService.update(entry)
        .subscribe(
            entry => this.actionForSuccess(entry),
            error => this.actionsForError(error)
        )

  }

  private actionForSuccess(entry:Entry){
      toastr.success("Solicitacao efetuada com sucesso!");
      this.router.navigateByUrl("categories", {skipLocationChange:true}).then(
          () => this.router.navigate(["categories", entry.id, "edit"])
      )
  }

  private actionsForError(error){
    toastr.error("Ocorreu um erro ao processar sua solicitação");
    this.submittingForm = false;
    if(error.status === 422)
      this.serverErrorMessages = JSON.parse(error._body).erros;
    else
      this.serverErrorMessages = ["Falha na comunicacao. Tente mais tarde!"];
    
  }
}
