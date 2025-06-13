import {Injectable} from '@angular/core';
import {Categoria} from "../Models/Categoria";
import {Firestore, addDoc, collection, getDocs, query, where} from "@angular/fire/firestore";

@Injectable({
    providedIn: 'root'
})
export class CategoriaService {

    categoriaEntrate = collection(this.firestore, 'categoria_entrate');
    categoriaUscite = collection(this.firestore, 'categoria_uscite');

    constructor(
        private firestore: Firestore
    ) {
    }

    // gestione delle entrate
    aggiungiCategoriaEntrate(categoriaEntrate: Categoria): Promise<any> {
        return addDoc(this.categoriaEntrate, {...categoriaEntrate});
    }

    getCategorieEntrata(): Promise<Categoria[]> {
        return getDocs(query(this.categoriaEntrate, where('nomeCategoria', '!=', ''))).then(res => res.docs.map(doc => {
            return {...doc.data(), id: doc.id};
        })) as Promise<Categoria[]>;
    }

    // gestione delle uscite
    aggiungiCategoriaUscite(categoriaUscite: Categoria): Promise<any> {
        return addDoc(this.categoriaUscite, {...categoriaUscite});
    }

    getCategorieUscita(): Promise<Categoria[]> {
        return getDocs(query(this.categoriaUscite, where('nomeCategoria', '!=', ''))).then(res => res.docs.map(doc => {
            return {...doc.data(), id: doc.id}
        })) as Promise<Categoria[]>;
    }


}

