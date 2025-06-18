import {TIPO_TRANSAZIONE} from "./enums";

export interface Transazione {
    id?: number;
    tipologia: TIPO_TRANSAZIONE;
    idCategoria: string;
    importo: number;
    descrizione?: string | null;
    spesaRicorrente: boolean;
    giorno: number;
    mese: number;
    anno: number;
    data: Date;
}
