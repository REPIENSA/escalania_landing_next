// src/application/contacto/use-cases/EnviarFormularioContactoUseCase.ts

import { EnviarFormularioContactoEntradaDto } from "../dtos/EnviarFormularioContactoEntradaDto";
import { EnviarFormularioContactoSalidaDto } from "../dtos/EnviarFormularioContactoSalidaDto";
import { ServicioDeCorreoPort } from "../ports/ServicioDeCorreoPort";
import { crearSolicitudContacto } from "@/domain/contacto/services/CrearSolicitudContacto";

interface PropsEnviarFormularioContactoUseCase {
    servicioDeCorreo: ServicioDeCorreoPort;
}

export class EnviarFormularioContactoUseCase {
    
    private readonly servicioDeCorreo: ServicioDeCorreoPort;

    constructor(props: PropsEnviarFormularioContactoUseCase) {
        this.servicioDeCorreo = props.servicioDeCorreo;
    }

    public async ejecutar(
        entrada: EnviarFormularioContactoEntradaDto
    ): Promise<EnviarFormularioContactoSalidaDto> {
        const solicitudContacto = crearSolicitudContacto({
            nombreApellidos: entrada.nombreApellidos,
            correo: entrada.correo,
            whatsapp: entrada.whatsapp,
        });

        await this.servicioDeCorreo.enviarFormularioContacto(solicitudContacto);

        return {
            ok: true,
            mensaje: "Formulario enviado correctamente.",
        };
    }
}