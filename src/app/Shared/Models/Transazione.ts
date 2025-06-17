import {TIPO_TRANSAZIONE} from "./TIPO_TRANSAZIONE";

export interface Transazione {
    id?: number;
    tipologia: TIPO_TRANSAZIONE;
    idCategoria: string;
    importo: number;
    descrizione?: string | null;
    spesaRicorrente: boolean
}
