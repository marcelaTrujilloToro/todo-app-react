import DropdownEliminar from "./dropdown-eliminar-comp";
import { EstadoTarea, Tarea } from "../models/tarea";

type ListaProps = {
    arregloTareas: Array<Tarea>; 
    eliminarTareaFn: (tareaAElimininar:Tarea) => void; 
    modificarTareaFn: (tareaAModificar:Tarea, estadoNuevo: EstadoTarea) => void; 
}


const ListadoTareas: React.FunctionComponent<ListaProps> = (props) => {    

    return (
        <div>
        <ul>
            {props.arregloTareas.map((tarea) =>{
                return(
                    <li key = {tarea.codigo}>
                       Nombre tarea: <b>{tarea.nombre}</b>, 
                       duración: <b>{tarea.duracion}</b> hora, 
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
