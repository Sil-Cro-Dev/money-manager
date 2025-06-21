import {Injectable} from '@angular/core';
import {addDoc, collection, Firestore, getDocs, query, where} from "@angular/fire/firestore";
import {Transazione} from "../../Shared/Models/Transazione";
import {TIPO_TRANSAZIONE} from "../../Shared/Models/enums";
import {from, Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class TransazioneService {

    transazione = collection(this.firestore, 'transazione');

    constructor(private firestore: Firestore) {
    }

    aggiungiTransazione(transazione: Transazione): Observable<any> {
        return from(addDoc(this.transazione, {...transazione}) as Promise<any>) as Observable<any>;
    }

    getEntrate(): Observable<Transazione[]> {
        return from(getDocs(query(this.transazione, where('tipologia', '==', TIPO_TRANSAZIONE.ENTRATA))).then(res => res.docs.map(doc => {
            return {...doc.data(), id: doc.id};
        })) as Promise<Transazione[]>) as Observable<Transazione[]>;
    }

    getUscite(): Observable<Transazione[]> {
        return from(getDocs(query(this.transazione, where('tipologia', '==', TIPO_TRANSAZIONE.USCITA))).then(res => res.docs.map(doc => {
            return {...doc.data(), id: doc.id};
        })) as Promise<Transazione[]>) as Observable<Transazione[]>;
    }

    getTransazioni(): Observable<Transazione[]> {
        return from(getDocs(query(this.transazione, where('mese', '==', new Date().getMonth() + 1))).then(res => res.docs.map(doc => {
            return {...doc.data(), id: doc.id};
        })) as Promise<Transazione[]>) as Observable<Transazione[]>;
    }


}
