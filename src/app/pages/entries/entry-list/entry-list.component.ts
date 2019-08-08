import { Component, OnInit } from '@angular/core';
import { EntryService } from '../shared/entry.service';
import { Entry } from '../shared/entry.model';

@Component({
  selector: 'app-entry-list',
  templateUrl: './entry-list.component.html',
  styleUrls: ['./entry-list.component.css']
})
export class EntryListComponent implements OnInit {

  entries: Entry[] = [];

  constructor(private entryService: EntryService) { }

  ngOnInit() {
        this.entryService.getAll().subscribe(
          entries => this.entries = entries,
          error => alert('Erro ao carregar a lista de categorias') 
        )
  }

  deleteEntry(entry){
    const confirmaDelecao = confirm('Deseja excluir o item ? ');
    if(confirmaDelecao){
      this.entryService.delete(entry.id).subscribe(
        /* montando um array com todos os elementos da lista original em memoria, exceto a 
        categoria que esta sendo excluida.
        */
        () => this.entries = this.entries.filter(element => element != entry),
        () => alert('erro ao tentar excluir')
      )
    }
     
  }

}
