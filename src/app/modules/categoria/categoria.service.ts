import {Injectable} from '@angular/core';
import {Categoria} from "../../Shared/Models/Categoria";
import {addDoc, collection, doc, Firestore, getDoc, getDocs, query, where} from "@angular/fire/firestore";
import {from, Observable} from "rxjs";

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

  getCategorieEntrata(): Observable<Categoria[]> {
    return from(getDocs(query(this.categoriaEntrate, where('nomeCategoria', '!=', ''))).then(res => res.docs.map(doc => {
      return {...doc.data(), id: doc.id};
    })) as Promise<Categoria[]>) as Observable<Categoria[]>;
  }

  // gestione delle uscite
  aggiungiCategoriaUscite(categoriaUscite: Categoria): Promise<any> {
    return addDoc(this.categoriaUscite, {...categoriaUscite});
  }

  getCategorieUscita(): Observable<Categoria[]> {
    return from(getDocs(query(this.categoriaUscite, where('nomeCategoria', '!=', ''))).then(res => res.docs.map(doc => {
      return {...doc.data(), id: doc.id};
    })) as Promise<Categoria[]>) as Observable<Categoria[]>;
  }

  getCategoriaEntrateById(idCategoria: string): Observable<Categoria> {
    return from(getDoc(doc(this.categoriaEntrate, idCategoria)).then(res => {
      return {...res.data(), id: res.id}
    }) as Promise<Categoria>) as Observable<Categoria>;
  }


  getCategoriaUscitaById(idCategoria: string): Observable<Categoria> {
    return from(getDoc(doc(this.categoriaUscite, idCategoria)).then(res => {
      return {...res.data(), id: res.id}
    }) as Promise<Categoria>) as Observable<Categoria>;
  }

}

