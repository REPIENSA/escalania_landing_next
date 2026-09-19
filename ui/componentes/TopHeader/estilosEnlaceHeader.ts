import type { SystemStyleObject } from '@mui/system';
import type { Theme } from '@mui/material/styles';
import { alpha } from '@mui/material/styles';
import { paletaMarca } from '@/ui/theme/colores';

/**
 * Estilo compartido por los enlaces y los botones de menú del header.
 *
 * El subrayado se dibuja debajo del texto al pasar el cursor y queda fijo
 * cuando el enlace corresponde a la página actual.
 */
export function estilosEnlaceHeader(activo: boolean): SystemStyleObject<Theme> {
    return {
        position: 'relative',
        minHeight: 40,
        px: 1.5,
        borderRadius: 2,
        fontSize: '0.95rem',
        fontWeight: 500,
        color: activo ? paletaMarca.principal : paletaMarca.textoPrincipal,
        backgroundColor: 'transparent',

        '&::after': {
            content: '""',
            position: 'absolute',
            left: 12,
            right: 12,
            bottom: 6,
            height: 2,
            borderRadius: 1,
            backgroundColor: paletaMarca.principal,
            transform: activo ? 'scaleX(1)' : 'scaleX(0)',
            transformOrigin: 'left center',
            transition: 'transform 0.3s cubic-bezier(0.22, 1, 0.36, 1)',
        },

        '@media (hover: hover)': {
            '&:hover': {
                color: paletaMarca.principal,
                backgroundColor: alpha(paletaMarca.principal, 0.06),
                '&::after': { transform: 'scaleX(1)' },
            },
        },

        '@media (prefers-reduced-motion: reduce)': {
            '&::after': { transition: 'none' },
        },
    };
}
