// ui/componentes/formularioContacto/codigosPaisLatam.data.ts

export interface CodigoPais {
    /** Código ISO 3166-1 alfa-2. Es la clave del select: `codigo` no sirve
     *  porque República Dominicana y Puerto Rico comparten el +1. */
    iso: string;
    nombre: string;
    codigo: string;
    bandera: string;
    /** Longitudes válidas del número nacional, sin el código de país. */
    digitos: number[];
}

export const CODIGOS_PAIS_LATAM: CodigoPais[] = [
    { iso: 'AR', nombre: 'Argentina', codigo: '+54', bandera: '🇦🇷', digitos: [10] },
    { iso: 'BO', nombre: 'Bolivia', codigo: '+591', bandera: '🇧🇴', digitos: [8] },
    { iso: 'BR', nombre: 'Brasil', codigo: '+55', bandera: '🇧🇷', digitos: [10, 11] },
    { iso: 'CL', nombre: 'Chile', codigo: '+56', bandera: '🇨🇱', digitos: [9] },
    { iso: 'CO', nombre: 'Colombia', codigo: '+57', bandera: '🇨🇴', digitos: [10] },
    { iso: 'CR', nombre: 'Costa Rica', codigo: '+506', bandera: '🇨🇷', digitos: [8] },
    { iso: 'CU', nombre: 'Cuba', codigo: '+53', bandera: '🇨🇺', digitos: [8] },
    { iso: 'EC', nombre: 'Ecuador', codigo: '+593', bandera: '🇪🇨', digitos: [9] },
    { iso: 'SV', nombre: 'El Salvador', codigo: '+503', bandera: '🇸🇻', digitos: [8] },
    { iso: 'GT', nombre: 'Guatemala', codigo: '+502', bandera: '🇬🇹', digitos: [8] },
    { iso: 'HN', nombre: 'Honduras', codigo: '+504', bandera: '🇭🇳', digitos: [8] },
    { iso: 'MX', nombre: 'México', codigo: '+52', bandera: '🇲🇽', digitos: [10] },
    { iso: 'NI', nombre: 'Nicaragua', codigo: '+505', bandera: '🇳🇮', digitos: [8] },
    { iso: 'PA', nombre: 'Panamá', codigo: '+507', bandera: '🇵🇦', digitos: [8] },
    { iso: 'PY', nombre: 'Paraguay', codigo: '+595', bandera: '🇵🇾', digitos: [9] },
    { iso: 'PE', nombre: 'Perú', codigo: '+51', bandera: '🇵🇪', digitos: [9] },
    { iso: 'PR', nombre: 'Puerto Rico', codigo: '+1', bandera: '🇵🇷', digitos: [10] },
    { iso: 'DO', nombre: 'República Dominicana', codigo: '+1', bandera: '🇩🇴', digitos: [10] },
    { iso: 'UY', nombre: 'Uruguay', codigo: '+598', bandera: '🇺🇾', digitos: [8] },
    { iso: 'VE', nombre: 'Venezuela', codigo: '+58', bandera: '🇻🇪', digitos: [10] },
];

export const ISO_PAIS_POR_DEFECTO = 'PE';

export function obtenerPaisPorIso(iso: string): CodigoPais {
    return (
        CODIGOS_PAIS_LATAM.find((pais) => pais.iso === iso) ??
        CODIGOS_PAIS_LATAM.find((pais) => pais.iso === ISO_PAIS_POR_DEFECTO)!
    );
}

/** "9 dígitos" / "10 u 11 dígitos", para armar el mensaje de error. */
export function describirDigitos(digitos: number[]): string {
    if (digitos.length === 1) {
        return `${digitos[0]} dígitos`;
    }

    const ultimo = digitos[digitos.length - 1];
    const previos = digitos.slice(0, -1).join(', ');

    return `${previos} u ${ultimo} dígitos`;
}
