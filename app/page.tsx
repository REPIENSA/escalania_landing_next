
import { Box, Container, Grid} from '@mui/material';

export const metadata = {
    title: 'Escalania | Transformamos la creatividad infantil ',
	description:'A través del dibujo y el arte, invitamos a los niños a imaginar, crear y dar vida a sus propias prendas de vestir',
};

import Beneficios from './component/beneficios/Beneficios';
import Solucion from './component/solucion/Solucion';
import Header from './component/header/Header';
import Testimonios from './component/testimonios/Testimonios';
import Clientes from './component/clientes/Clientes';
import TopHeader from './component/header/TopHeader';

export default async function HomePage() {
    

    return (
        <Box>
            <TopHeader/>
            <Header/>
            <Solucion/>
            <Beneficios/>
            <Testimonios />
            <Clientes />
        </Box>
    );
}