import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,//aula 18 - sem esse import dá erro de provider.
  ],
  exports:[
    CommonModule,
    ReactiveFormsModule
  ]
})
export class SharedModule { }
