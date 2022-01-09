import { Component, Input, OnInit } from '@angular/core';

interface BreadCumbItem{
  text: string; //atributo obrigatorio
  link?: string; //atributo opcional
}

@Component({
  selector: 'app-bread-cumb',
  templateUrl: './bread-cumb.component.html',
  styleUrls: ['./bread-cumb.component.css']
})
export class BreadCumbComponent implements OnInit {

  @Input() items: Array<BreadCumbItem> = [];
  constructor() { }

  ngOnInit() {
  }
  
  isTheLastItem(item: BreadCumbItem): boolean{
    const index = this.items.indexOf(item);
    return index + 1 == this.items.length;
  }
}
