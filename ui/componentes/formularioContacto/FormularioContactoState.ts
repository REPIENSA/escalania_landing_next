// ui/componentes/formulario-contacto/FormularioContactoState.ts

import { ISO_PAIS_POR_DEFECTO } from "./codigosPaisLatam.data";

export interface FormularioContactoState {
    nombreApellidos: string;
    correo: string;
    /** ISO del país seleccionado, por ejemplo "PE". */
    codigoPais: string;
    /** Número nacional, solo dígitos, sin el código de país. */
    whatsapp: string;
}

export const formularioContactoInicial: FormularioContactoState = {
    nombreApellidos: "",
    correo: "",
    codigoPais: ISO_PAIS_POR_DEFECTO,
    whatsapp: "",
};
