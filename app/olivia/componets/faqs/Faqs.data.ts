// app/olivia/componets/faqs/Faqs.data.ts

export interface Faq {
    id: string;
    pregunta: string;
    respuesta: string;
}

export const FAQS: Faq[] = [

    {
        id: 'costo',
        pregunta: '¿Cuál es el costo de Olivia?',
        respuesta:
            'El costo de Olivia es desde S/ 490 soles al mes, y puede elevarse si superas los 1,500 mensajes al mes depende del volumen de consultas que recibes y del plan que elijas. El precio inicial',
    },
    {
        id: 'para-quien-si',
        pregunta: '¿Para quién es Olivia?',
        respuesta:
            'Para Centros médicos y estéticos que reciben consultas por WhatsApp o Instagram todos los días, a los que les escriben fuera del horario y esos mensajes se pierden, donde contestas tú misma o tu recepcionista hace mil cosas a la vez, que tienen ausencias porque no cobran adelanto, y que quieren dejar de vivir pegados al celular.',
    },
    {
        id: 'notan-que-es-robot',
        pregunta: '¿Mis clientas se van a dar cuenta que no es un humano?',
        respuesta:
            'Más del 80% no lo nota. Olivia no responde con frases armadas: conversa. Y cuando una clienta pide hablar con una persona, deriva la conversación sin problema.',
    },
    {
        id: 'quien-la-configura',
        pregunta: '¿Tengo que configurarla yo?',
        respuesta:
            'No. Un ejecutivo la configura todo por ti. Tú solo nos cuentas cómo trabaja tu negocio.',
    },
    {
        id: 'whatsapp-actual',
        pregunta: '¿Funciona con mi WhatsApp Business?',
        respuesta: 'Sí. Olivia trabaja con el número de tu negocio que ya tienes funcionando.',
    },
    {
        id: 'cobra-yape-plin',
        pregunta: '¿Puede cobrar por Yape y Plin?',
        respuesta: 'Sí, en la misma conversación, si decides que servicios lo soliciten antes de agendar la cita.',
    },
    {
        id: 'cambio-de-precios',
        pregunta: '¿Qué pasa si cambio algun precio, servicio, horario, etc?',
        respuesta:
            'Le avisas a tu ejecutivo asignado y lo actualiza. Es parte del servicio, no tiene costo extra.',
    },
];

/** La primera pregunta es el filtro: va abierta por defecto. */
export const ID_FAQ_ABIERTA_POR_DEFECTO = FAQS[0].id;
