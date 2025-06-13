import {TIPO_TRANSAZIONE} from "./TIPO_TRANSAZIONE";

export interface Categoria {
    id?: number;
    nomeCategoria: string;
    tipoCategoria: TIPO_TRANSAZIONE
}
