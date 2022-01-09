import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { BreadCumbComponent } from './components/bread-cumb/bread-cumb.component';
import { RouterModule } from '@angular/router';
import { PageHeaderComponent } from './page-header/page-header.component';
import { FormFieldErrorComponent } from './components/form-field-error/form-field-error.component';

@NgModule({
  declarations: [BreadCumbComponent, PageHeaderComponent, FormFieldErrorComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,//aula 18 - sem esse import dá erro de provider.
    RouterModule
  ],
  exports:[
    CommonModule,
    ReactiveFormsModule,
    BreadCumbComponent,
    RouterModule,
    PageHeaderComponent,
    FormFieldErrorComponent
  ]
})
export class SharedModule { }
