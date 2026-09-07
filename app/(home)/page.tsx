
import { Box } from '@mui/material';

export const metadata = {
    title: 'Escalania | Olivia, el agente  de IA para spas y centros esteticos',
	description:'Agente de Inteligencia Artifical conversacional especializado en spas y centros esteticos',
};

import Hero1 from './componets/hero1/Hero1';
import Hero2 from './componets/hero2/Hero2';
import Faqs from './componets/faqs/Faqs';
import QueEs from './componets/queEs/QueEs';
import TopHeader from './componets/topHeader/TopHeader';
import Indicadores from './componets/indicadores/Indicadores';

export default async function HomePage() {


    return (
        <Box>
            <TopHeader/>
            <Hero1/>
            <Hero2/>
            <Indicadores/>
            <QueEs/>
            <Faqs/>
        </Box>
    );
}
