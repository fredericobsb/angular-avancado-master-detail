import {OnInit, AfterContentChecked, Injector } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import { CategoryService } from 'src/app/pages/categories/shared/category.service';
import toastr from "toastr";
import { BaseResourceModel } from '../../models/base-resource.model';
import { BaseResourceService } from '../../services/base-resource.service';

export abstract class BaseResourceFormComponent<T extends BaseResourceModel> implements OnInit, AfterContentChecked {

  currentAction: string;
  resourceForm: FormGroup;
  pageTitle: string;
  serverErrorMessages: string[] = null;
  submittingForm: boolean = false;

  protected route: ActivatedRoute;
  protected router: Router;
  protected formBuilder: FormBuilder;
  

  constructor(
    protected injector: Injector,
    public resource: T,
    protected resourceService: BaseResourceService<T>,
    protected jsonDataToResourceFn: (jsonData) => T
  ) {
      this.route = this.injector.get(ActivatedRoute);
      this.router = this.injector.get(Router);
      this.formBuilder = this.injector.get(FormBuilder);
   }

  ngOnInit() {
    this.setCurrentAction();
    this.buildResourceForm();
    this.loadResource();
  }

  ngAfterContentChecked(){
    this.setPageTitle();
  }

  submitForm(){
    this.submittingForm = true;
    if(this.currentAction == "new")
        this.createResource();
    else
        this.updateResource();
  }

  //metodos privados
  protected setCurrentAction(){
   if(this.route.snapshot.url[0].path == "new"){
     this.currentAction = "new";
   } 
   else{
     this.currentAction = "edit";
   }
  }

  private loadResource(){
    if(this.currentAction == "edit"){
       this.route.paramMap.pipe(
            switchMap(params => this.resourceService.getById(+ params.get("id")))
       )
       .subscribe(
         (resource) => {
              this.resource = resource;
              this.resourceForm.patchValue(resource)
         },
         (error) => alert('Deu pau!')
       )
    }
  }

  private setPageTitle(){
    if(this.currentAction == "new"){
      this.pageTitle = this.creationPageTitle();
    }
    else{
      this.pageTitle = this.editionPageTitle();
    }
  }

  protected creationPageTitle(): string {
    return "Novo"
  }

  protected editionPageTitle(): string {
    return "Edição"
  }

  protected createResource(){
      const resource: T = this.jsonDataToResourceFn(this.resourceForm.value);

      this.resourceService.create(resource)
          .subscribe(
              resource => this.actionForSuccess(resource),
              error => this.actionsForError(error)
          )
  }

  private updateResource(){
    const resource: T = this.jsonDataToResourceFn(this.resourceForm.value);

    this.resourceService.update(resource)
        .subscribe(
            resource => this.actionForSuccess(resource),
            error => this.actionsForError(error)
        )

  }

  protected actionForSuccess(resource:T){
      toastr.success("Solicitacao efetuada com sucesso!");
      const baseComponentPath: string = this.route.snapshot.parent.url[0].path;
      //redirect /reload component page
      //skipLocationChange => é para a aplicacao nao guardar no historico essa navegacao.
      this.router.navigateByUrl(baseComponentPath, {skipLocationChange:true}).then(
          () => this.router.navigate([baseComponentPath, resource.id, "edit"])
      )
  }

  private actionsForError(error){
    toastr.error("Ocorreu um erro ao processar sua solicitação");
    this.submittingForm = false;
    //Erro 422 => Não conseguiu processar a entidade
    if(error.status === 422)
      this.serverErrorMessages = JSON.parse(error._body).erros;
    else
      this.serverErrorMessages = ["Falha na comunicacao. Tente mais tarde!"];
  }

  // Toda classe que herdar baseResourceFormComponent será obrigada a implementar o proprio formulario. \o/
  protected abstract buildResourceForm():void;
}
