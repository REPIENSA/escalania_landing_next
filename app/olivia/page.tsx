
import { Box } from '@mui/material';

export const metadata = {
    title: 'Escalania | Soy el Agente Olivia',
	description:'Agente de Inteligencia Artifical conversacional especializado en spas y centros esteticos',
};

import Hero1 from './componets/hero1/Hero1';
import Hero2 from './componets/hero2/Hero2';
import Faqs from './componets/faqs/Faqs';

export default async function HomePage() {


    return (
        <Box>
            <Hero1/>
            <Hero2/>
            <Faqs/>

        </Box>
    );
}
