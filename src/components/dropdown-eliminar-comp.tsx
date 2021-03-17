import { EstadoTarea, Tarea } from "../models/tarea";

type DropProps  = {
    tareaAEliminar:Tarea;
    tareaAModificar: Tarea;
    estadoNuevo: EstadoTarea;
    eliminarTareaFn: (tareaAElimininar:Tarea) => void;
    modificarTareaFn: (tareaAModificar:Tarea, estadoNuevo:EstadoTarea) => void; 

}

const DropdownEliminar: React.FunctionComponent <DropProps> = (props) => {
    return(
        <div>
            <select 
                onChange = { (evento:any) =>{
                    props.modificarTareaFn(props.tareaAModificar, evento.target.value);
                }}
            >
                <option value="noIniciado">No iniciado</option>    
                <option value="iniciado">Iniciado</option>    
                <option value="terminado">Terminado</option>
                    
                </select>
                <button
                    type = "button"
                    onClick = { () =>{
                        props.eliminarTareaFn(props.tareaAEliminar);
                    }}
                    >Eliminar</button>
        </div>
    );
}
export default DropdownEliminar;

