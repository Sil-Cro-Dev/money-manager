import {Injectable} from '@angular/core';
import {addDoc, collection, Firestore, getDocs, query, where} from "@angular/fire/firestore";
import {Transazione} from "../Models/Transazione";
import {Categoria} from "../Models/Categoria";
import {TIPO_TRANSAZIONE} from "../Models/TIPO_TRANSAZIONE";

@Injectable({
    providedIn: 'root'
})
export class TransazioneService {

    transazione = collection(this.firestore, 'transazione');

    constructor(private firestore: Firestore) {
    }

    aggiungiTransazione(transazione: Transazione): Promise<any> {
        return addDoc(this.transazione, {...transazione}) as Promise<any>;
    }

    getEntrate(): Promise<Transazione[]> {
        return getDocs(query(this.transazione, where('tipologia', '==', TIPO_TRANSAZIONE.ENTRATA))).then(res => res.docs.map(doc => {
            return {...doc.data(), id: doc.id};
        })) as Promise<Transazione[]>;
    }

    getUscite(): Promise<Transazione[]> {
        return getDocs(query(this.transazione, where('tipologia', '==', TIPO_TRANSAZIONE.USCITA))).then(res => res.docs.map(doc => {
            return {...doc.data(), id: doc.id};
        })) as Promise<Transazione[]>;
    }

}
