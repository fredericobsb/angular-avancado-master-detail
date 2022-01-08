import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDatabase } from '../pages/in-memory-database';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule, //sera carregado apenas 1 vez.
    /*
    Interceptacao para as requisicoes http serem feitas com o banco em memoria.
    quando for usar api real, comentar ou apagar o arquivo "InMemoryDatabase".
    */
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDatabase),
  ],
  exports: [ //disponibilizando para app.module.ts
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule
  ]
})
export class CoreModule { }
