import { Component, OnInit } from '@angular/core';
import { BaseResourceModel } from '../../models/base-resource.model';
import { BaseResourceService } from '../../services/base-resource.service';


export abstract class BaseResourceListComponent<T extends BaseResourceModel> implements OnInit {

   resources: T[] = [];

   constructor(private resourceService: BaseResourceService<T>) { }

  ngOnInit() {
        this.resourceService.getAll().subscribe(
          resources => this.resources = resources.sort((a,b) => b.id - a.id),//.ORDENACAO
          error => alert('Erro ao carregar a lista de categorias') 
        )
  }

  deleteResource(resource: T){
    const mustDelete = confirm('Deseja excluir o item ? ');
    if(mustDelete){
      this.resourceService.delete(resource.id).subscribe(
        /* montando um array com todos os elementos da lista original em memoria, exceto a 
        categoria que esta sendo excluida.
        */
        () => this.resources = this.resources.filter(element => element != resource),
        () => alert('erro ao tentar excluir')
      )
    }
     
  }

}
