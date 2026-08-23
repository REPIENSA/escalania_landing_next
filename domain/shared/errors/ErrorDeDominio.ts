// domain/shared/errors/ErrorDeDominio.ts

/**
 * Error causado por datos que el visitante puede corregir.
 *
 * Sirve para distinguirlo de un fallo de infraestructura (configuración
 * faltante, Gmail caído): el mensaje de un ErrorDeDominio se le puede mostrar
 * al visitante, el de cualquier otro error no.
 */
export class ErrorDeDominio extends Error {
    constructor(mensaje: string) {
        super(mensaje);
        this.name = "ErrorDeDominio";
    }
}
