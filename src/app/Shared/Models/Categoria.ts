import {TIPO_TRANSAZIONE} from "./enums";

export interface Categoria {
    id?: string;
    nomeCategoria: string;
    tipoCategoria: TIPO_TRANSAZIONE
}
