import {InMemoryDbService} from "angular-in-memory-web-api";
import { Category } from './categories/shared/category.model';
import { Entry } from './entries/shared/entry.model';

export class InMemoryDatabase implements InMemoryDbService{
    createDb(){
        const categories: Category[] = [
            {id: 1, name: "Moradia", description:  "Moradia e contas da casa"  },
            {id: 2, name: "Saúde", description:  "Saúde  e contas da casa"  },
            {id: 3, name: "Lazer", description:  "Lazer e contas da casa"  },
            {id: 4, name: "Salário", description:  "Salário  e contas da casa"  }
        ];

        const entries: Entry[] = [
            {id: 1, nome: 'Gás de cozinha', categoryId: categories[0].id, category: categories[0], paid: true, date: "14/01/2018", amount: "70,80", type: "revenue", description: "Qualquer descricao"} as Entry,
            {id: 2, nome: 'Suplementos', categoryId: categories[1].id, category: categories[1], paid: false, date: "14/10/2018", amount: "15,00", type: "expense", description: "Qualquer descricao"} as Entry,
            {id: 3, nome: 'Salario na empresa x', categoryId: categories[3].id, category: categories[3], paid: true, date: "15/10/2018", amount: "44,05", type: "revenue", description: "Qualquer descricao"} as Entry,
            {id: 4, nome: 'Aluguel de filme', categoryId: categories[2].id, category: categories[2], paid: false, date: "15/10/2018", amount: "44,05", type: "expense", description: "Qualquer descricao"} as Entry,
            {id: 5, nome: 'Uber', categoryId: categories[1].id, category: categories[1], paid: true, date: "15/10/2018", amount: "44,67", type: "revenue", description: "Qualquer descricao"} as Entry,
            {id: 6, nome: 'Cinema', categoryId: categories[2].id, category: categories[2], paid: false, date: "15/10/2018", amount: "44,89", type: "expense", description: "Qualquer descricao"} as Entry,


        ];

        return {categories, entries}
    }
}