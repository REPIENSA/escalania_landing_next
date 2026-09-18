import type { SvgIconComponent } from '@mui/icons-material';
import StorefrontIcon from '@mui/icons-material/Storefront';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import PsychologyIcon from '@mui/icons-material/Psychology';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AddReactionIcon from '@mui/icons-material/AddReaction';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import EmojiEmotionsRoundedIcon from '@mui/icons-material/EmojiEmotionsRounded';

export interface DatoIndicador {
    id: string;
    icono: SvgIconComponent;
    /** Va antes de la cifra: el "+" o la "x". */
    prefijo?: string;
    /** Solo el número: es lo que se anima al entrar en pantalla. */
    valor: number;
    /** Va después de la cifra, como el "%". */
    sufijo?: string;
    titulo: string;
}

export const INDICADORES: DatoIndicador[] = [
    {
        id: 'centros',
        icono: StorefrontIcon,
        prefijo: '+',
        valor: 30,
        titulo: 'Centros estéticos confían en Olivia',
    },
    {
        id: 'citas',
        icono: EventAvailableIcon,
        prefijo: '+',
        valor: 3000,
        titulo: 'Citas agendadas el mes pasado',
    },
    {
        id: 'natural',
        icono: EmojiEmotionsRoundedIcon,
        valor: 8,
        sufijo: ' de 10',
        titulo: 'Clientes no notan que es IA',
    },
    {
        id: 'respuesta',
        icono: FavoriteRoundedIcon,
        prefijo: 'x',
        valor: 3,
        titulo: 'Aumento en la tasa de respuesta',
    },
];
