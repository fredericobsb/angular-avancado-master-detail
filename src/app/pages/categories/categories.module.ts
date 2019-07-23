import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryFormComponent } from './category-form/category-form.component';
import {ReactiveFormsModule} from '@angular/forms';//aula 18 - sem esse import dá erro de provider. 

@NgModule({
  declarations: [CategoryListComponent, CategoryFormComponent],
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    ReactiveFormsModule//aula 18 - sem esse import dá erro de provider.
  ]
})
export class CategoriesModule { }
