import { useState } from "react";
import { EstadoTarea, Tarea } from "../models/tarea";

type FormularioProps = {
    crearNuevaTareaFn: (tareaAAdicionar:Tarea) => void;
}

export const FormularioTarea: React.FunctionComponent<FormularioProps> = (props) => {

    const [nombre, setNombre] = useState<string>("");
    const [duracion, setDuracion] = useState<number>(0);
    const [estado, setEstado] = useState<EstadoTarea>("noIniciado");

    return(
        <div>
            <form className = "formTareas">
                Título: <input 
                    type="text"
                    value = {nombre}
                    onChange = {(evento:any) =>{
                        setNombre(evento.target.value);
                    }}
                />
                Duración: <input 
                    type="number"
                    value = {duracion}
                    onChange = {(evento:any) => {
                        setDuracion(parseFloat(evento.target.value));
                    }}
                />
                <br/>
                <select
                    value = {estado}
                    onChange = {(evento:any) => {
                        setEstado(evento.target.value);
                    }}
                >
                    <option value="noIniciado">No iniciado</option>    
                    <option value="iniciado">Iniciado</option>    
                    <option value="terminado">Terminado</option>    
                </select>    
                
                <button
                    type = "button"
                    onClick = { () => {
                        let nuevaTarea = new Tarea();
                        nuevaTarea.codigo = Math.random().toString();
                        nuevaTarea.nombre = nombre;
                        nuevaTarea.duracion = duracion;
                        nuevaTarea.estado = estado;
                        props.crearNuevaTareaFn(nuevaTarea);
                    }}
                >Guardar tarea
                </button>
            </form> 
        </div>
    );
}
export default FormularioTarea;