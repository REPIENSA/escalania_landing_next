export interface ClienteLogo {
    id: string;
    nombre: string;
    logoSrc: string;
    width?: number;  // control fino del tamaño por logo
}

export const CLIENTES_LOGOS: ClienteLogo[] = [
    { id: '1', nombre: 'Empresa 1', logoSrc: '/imagenes/clientes/cliente1-pera.svg'},
    { id: '2', nombre: 'Empresa 2', logoSrc: '/imagenes/clientes/cliente2-repiensa.svg'},
    { id: '3', nombre: 'Empresa 3', logoSrc: '/imagenes/clientes/cliente3-ppol.svg'},
    { id: '4', nombre: 'Empresa 4', logoSrc: '/imagenes/clientes/cliente4-cafe.svg'},
    { id: '6', nombre: 'Empresa 6', logoSrc: '/imagenes/clientes/cliente6-acl.svg'},
    { id: '7', nombre: 'Empresa 6', logoSrc: '/imagenes/clientes/cliente7-yolohice.svg'},
    { id: '8', nombre: 'Empresa 6', logoSrc: '/imagenes/clientes/cliente8-ema.svg'},
    { id: '9', nombre: 'Empresa 6', logoSrc: '/imagenes/clientes/cliente9-plazavea.svg'},
    { id: '10', nombre: 'Empresa 6', logoSrc: '/imagenes/clientes/cliente10-panadex.svg'},
];