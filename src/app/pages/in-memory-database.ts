import {InMemoryDbService} from "angular-in-memory-web-api";
import { Category } from './categories/shared/category.model';

export class InMemoryDatabase implements InMemoryDbService{
    createDb(){
        const categories: Category[] = [
            {id: 1, name: "Moradia", description:  "Moradia e contas da casa"  },
            {id: 2, name: "Saúde", description:  "Saúde  e contas da casa"  },
            {id: 3, name: "Lazer", description:  "Lazer e contas da casa"  },
            {id: 4, name: "Salário", description:  "Salário  e contas da casa"  }
        ];
        return {categories}
    }
}