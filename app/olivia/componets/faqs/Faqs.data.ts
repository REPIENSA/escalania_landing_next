// app/olivia/componets/faqs/Faqs.data.ts

export interface Faq {
    id: string;
    pregunta: string;
    respuesta: string;
}

export const FAQS: Faq[] = [
    {
        id: 'para-quien-no',
        pregunta: '¿Para quién NO es Olivia?',
        respuesta:
            'Si recibes muy pocas consultas al mes y las atiendes sin problema, si buscas algo gratuito o una versión de prueba —no la tenemos—, si no estás dispuesto a comprometerte por dos meses, si quieres un bot de menú de opciones —que es mucho más barato— o si prefieres que absolutamente todo lo responda una persona. Si te reconoces ahí, mejor te lo decimos ahora y no te hacemos perder el tiempo.',
    },
    {
        id: 'para-quien-si',
        pregunta: '¿Para quién sí es Olivia?',
        respuesta:
            'Para Centros esticos que reciben consultas por WhatsApp o Instagram todos los días, a los que les escriben fuera del horario y esos mensajes se enfrían, donde contestas tú misma o tu recepcionista hace mil cosas a la vez, que tienen ausencias porque no cobran adelanto, y que quieren dejar de vivir pegados al celular.',
    },
    {
        id: 'notan-que-es-robot',
        pregunta: '¿Mis clientas se van a dar cuenta de que es un robot?',
        respuesta:
            'Más del 80% no lo nota. Olivia no responde con frases armadas: conversa. Y cuando una clienta pide hablar con una persona, deriva la conversación sin problema.',
    },
    {
        id: 'quien-la-configura',
        pregunta: '¿Tengo que configurarla yo?',
        respuesta:
            'No. Un ejecutivo la configura todo contigo, con las sesiones que necesites. Tú solo le cuentas cómo trabaja tu spa.',
    },
    {
        id: 'whatsapp-actual',
        pregunta: '¿Funciona con mi WhatsApp Business actual?',
        respuesta: 'Sí. Olivia trabaja con el número de tu negocio que ya tienes funcionando.',
    },
    {
        id: 'cobra-yape-plin',
        pregunta: '¿Puede cobrar por Yape y Plin?',
        respuesta: 'Sí, en la misma conversación, si decides que uno, varios o todos tus servicios lo soliciten antes de agendar la cita.',
    },
    {
        id: 'cambio-de-precios',
        pregunta: '¿Qué pasa si cambio precios, agrego un servicio, cambio mi horario, etc?',
        respuesta:
            'Le avisas a tu ejecutivo asignado y lo actualiza. Es parte del servicio, no tiene costo extra.',
    },
];

/** La primera pregunta es el filtro: va abierta por defecto. */
export const ID_FAQ_ABIERTA_POR_DEFECTO = FAQS[0].id;
