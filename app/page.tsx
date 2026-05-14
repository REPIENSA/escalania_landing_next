
import { Box, Container, Grid} from '@mui/material';
import { CardCambiante } from '@/ui/componentes/cards/CardCambiante';

export const metadata = {
    title: 'Escalania | Transformamos la creatividad infantil ',
	  description:'A través del dibujo y el arte, invitamos a los niños a imaginar, crear y dar vida a sus propias prendas de vestir',
};

import Beneficios from './component/beneficios/Beneficios';
import Solucion from './component/solucion/Solucion';
import Header from './component/header/Header';
import Testimonios from './component/testimonios/Testimonios';
import ClientesLogos from './component/clientes/ClientesLogos';

export default async function HomePage() {
    

    return (
        <Box>
            <Header/>
            <Solucion/>
            <Beneficios/>
            <Testimonios />
            <ClientesLogos />
        </Box>
    );
}