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
        fuente: 'Pera Consultores',
        calificacion: 5,
        texto: 'Cuando me escriben El agente responde al instante y cierra la venta sin estar resente. Me da paz tener la tranquilidad de no tener mensajes pendientes.',
        avatar: 'MT',
    },
    {
        id: '2',
        nombre: 'Carlos Mendoza',
        fuente: 'Banbif',
        calificacion: 5,
        texto: 'Mis clientes preguntan a las 11pm y el agente responde perfecto. Nunca pierdo una oportunidad.',
        avatar: 'CM',
    },
    {
        id: '3',
        nombre: 'Lucía Fernández',
        fuente: 'REPIENSA',
        calificacion: 5,
        texto: 'Lo que más me sorprendió fue que el agente suena natural, no robótico. Mis clientes no notan la diferencia.',
        avatar: 'LF',
    },
    {
        id: '4',
        nombre: 'Diego Ramírez',
        fuente: 'Central Cafe & Cacao',
        calificacion: 5,
        texto: 'Ahorramos horas de atención al día. El equipo ahora se enfoca en lo que realmente importa.',
        avatar: 'DR',
    },
    {
        id: '5',
        nombre: 'Ana Castillo',
        fuente: 'YOLOHICE',
        calificacion: 5,
        texto: 'Pensé que sería complicado de configurar pero en un día ya estaba atendiendo a mis clientes solo.',
        avatar: 'AC',
    },
];