import DropdownEliminar from "./dropdown-eliminar-comp";
import { EstadoTarea, Tarea } from "../models/tarea";

type ListaProps = {
    arregloTareas: Array<Tarea>; 
    eliminarTareaFn: (tareaAElimininar:Tarea) => void; 
    modificarTareaFn: (tareaAModificar:Tarea, estadoNuevo: EstadoTarea) => void;
     
}

const ListadoTareas: React.FunctionComponent<ListaProps> = (props) => {    

    console.log(`arreglo tareas: ${JSON.stringify(props.arregloTareas)}`)
    return (    
        
        <div>
  
            <ul>
                {props.arregloTareas.map((tarea) =>{
                    {console.log(tarea.nombre)}
                    return(
                        <li key = {tarea.id}>
                                <b>{tarea.nombre}:</b> 
                                duracion: <b>{tarea.duracion}</b> horas, 
                                estado: {tarea.estado}
                                <DropdownEliminar 
                                        tareaAEliminar = {tarea}
                                        eliminarTareaFn= {props.eliminarTareaFn}

                                        tareaAModificar= {tarea}
                                        estadoNuevo = {tarea.estado}
                                        modificarTareaFn={props.modificarTareaFn}
                                />                                             
                        </li>
                    )
                })}
            </ul>

        </div>
    )
}

export default ListadoTareas;

