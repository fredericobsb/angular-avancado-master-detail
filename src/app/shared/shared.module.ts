import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { BreadCumbComponent } from './components/bread-cumb/bread-cumb.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [BreadCumbComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,//aula 18 - sem esse import dá erro de provider.
    RouterModule
  ],
  exports:[
    CommonModule,
    ReactiveFormsModule,
    BreadCumbComponent,
    RouterModule
  ]
})
export class SharedModule { }
