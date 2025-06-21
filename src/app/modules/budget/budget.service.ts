import {Injectable} from '@angular/core';
import {addDoc, collection, deleteDoc, doc, Firestore, getDocs, orderBy, query, where} from "@angular/fire/firestore";
import {Budget} from "../../Shared/Models/Budget";

@Injectable({
    providedIn: 'root'
})
export class BudgetService {
    budget = collection(this.firestore, 'budget');

    constructor(private firestore: Firestore) {
    }

    aggiungiBudget(budget: Budget): Promise<any> {
        return addDoc(this.budget, {...budget});
    }

    getBudgets(): Promise<Budget[]> {
        return getDocs(query(
                this.budget,
                where('nomeCategoria', '!=', ''),
                orderBy('tipoBudget', 'desc')
            )).then(res => res.docs.map(doc => {
            return {...doc.data(), id: doc.id};
        })) as Promise<Budget[]>;
    }

    rimuoviBudget(id: string): Promise<any> {
        return deleteDoc(doc(this.budget, id));
    }


}
