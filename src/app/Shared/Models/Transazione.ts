import {Categoria} from "./Categoria";
import {TIPO_TRANSAZIONE} from "./TIPO_TRANSAZIONE";

export interface Transazione {
    id?: number;
    tipologia: TIPO_TRANSAZIONE;
    categoria: Categoria;
    importo: number;
    descrizione?: string | null;
    spesaRicorrente: boolean
}
