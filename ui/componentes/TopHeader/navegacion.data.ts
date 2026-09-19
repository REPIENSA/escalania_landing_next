export interface EnlaceNavegacion {
    etiqueta: string;
    href: string;
}

export interface ItemNavegacion {
    etiqueta: string;
    /** Destino directo. Si el item tiene `subitems`, este se ignora. */
    href?: string;
    /** Opciones que se muestran en un menú desplegable. */
    subitems?: EnlaceNavegacion[];
}

/**
 * Opciones del header, en el orden en que se muestran.
 *
 * Las rutas de "Nosotros" y "Vania" todavía no existen: se dejan definidas
 * aquí para que crear la página sea lo único que falte.
 */
export const ITEMS_NAVEGACION: ItemNavegacion[] = [
    { etiqueta: 'Inicio', href: '/' },
    {
        etiqueta: 'Nosotros',
        subitems: [
            { etiqueta: 'Quiénes somos', href: '/nosotros/quienes-somos' },
            { etiqueta: 'Qué hacemos', href: '/nosotros/que-hacemos' },
            { etiqueta: 'Por qué con nosotros', href: '/nosotros/por-que-nosotros' },
        ],
    },
    {
        etiqueta: 'Nuestros Agentes',
        subitems: [
            { etiqueta: 'Olivia', href: '/olivia' },
            { etiqueta: 'Vania', href: '/vania' },
        ],
    },
];

/** Llamada a la acción principal del header. */
export const CTA_HEADER: EnlaceNavegacion = {
    etiqueta: 'Agenda una cita',
    href: '#contacto',
};
