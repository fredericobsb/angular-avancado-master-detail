import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../shared/category.service';
import { Category } from '../shared/category.model';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  categories: Category[] = [];

  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
        this.categoryService.getAll().subscribe(
          categories => this.categories = categories,
          error => alert('Erro ao carregar a lista de categorias') 
        )
  }

  deleteCategory(category){
    const confirmaDelecao = confirm('Deseja excluir o item ? ');
    if(confirmaDelecao){
      this.categoryService.delete(category.id).subscribe(
        /* montando um array com todos os elementos da lista original em memoria, exceto a 
        categoria que esta sendo excluida.
        */
        () => this.categories = this.categories.filter(element => element != category),
        () => alert('erro ao tentar excluir')
      )
    }
     
  }

}
