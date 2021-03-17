export type EstadoTarea =  "noIniciado" | "iniciado" | "terminado";

export class Tarea {

    codigo: string = "";
    nombre: string = "";
    duracion: number = 0;
    estado: EstadoTarea = "noIniciado";
}