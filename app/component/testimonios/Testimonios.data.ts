export interface Testimonio {
    id: string;
    nombre: string;
    fuente: string;
    calificacion: number;
    texto: string;
    avatar: string; // iniciales o url
}

export const TESTIMONIOS: Testimonio[] = [
    {
        id: '1',
        nombre: 'María Torres',
        fuente: 'Google Play',
        calificacion: 5,
        texto: 'El agente respondió al instante y cerré la venta sin estar presente. Increíble tener esa tranquilidad.',
        avatar: 'MT',
    },
    {
        id: '2',
        nombre: 'Carlos Mendoza',
        fuente: 'App Store',
        calificacion: 5,
        texto: 'Mis clientes preguntan a las 11pm y el agente responde perfecto. Nunca pierdo una oportunidad.',
        avatar: 'CM',
    },
    {
        id: '3',
        nombre: 'Lucía Fernández',
        fuente: 'Trustpilot',
        calificacion: 5,
        texto: 'Lo que más me sorprendió fue que el agente suena natural, no robótico. Mis clientes no notan la diferencia.',
        avatar: 'LF',
    },
    {
        id: '4',
        nombre: 'Diego Ramírez',
        fuente: 'Google Play',
        calificacion: 5,
        texto: 'Ahorramos horas de atención al día. El equipo ahora se enfoca en lo que realmente importa.',
        avatar: 'DR',
    },
    {
        id: '5',
        nombre: 'Ana Castillo',
        fuente: 'App Store',
        calificacion: 5,
        texto: 'Pensé que sería complicado de configurar pero en un día ya estaba atendiendo a mis clientes solo.',
        avatar: 'AC',
    },
];