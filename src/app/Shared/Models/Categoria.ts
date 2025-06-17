import {TIPO_TRANSAZIONE} from "./TIPO_TRANSAZIONE";

export interface Categoria {
    id?: string;
    nomeCategoria: string;
    tipoCategoria: TIPO_TRANSAZIONE
}
