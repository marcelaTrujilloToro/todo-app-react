import React, { useState } from 'react'
import { EstadoTarea } from '../models/tarea';

type BusquedaProps = {
    buscarTareaXNombreFn: (busquedaXNombre:string) => void;
    buscarTareaXEstadoFn: (busquedaXEstado:EstadoTarea) => void;
}

const BusquedaTarea:React.FunctionComponent<BusquedaProps> = (props) => {

    const [busquedaXNombre, setBusquedaXNombre] = useState<string>("");
    const [busquedaXEstado, setBusquedaXEstado] = useState<EstadoTarea>("noIniciado");

    return (
        <form className = "formBusqueda">
            <div>
                Por nombre: <input
                    type = "text"
                    value = {busquedaXNombre}
                    onChange = {(evento:any) => {
                        setBusquedaXNombre(evento.target.value);  
                    }}
                />
                <button
                    type = "button"
                    onClick = { () => {
                        props.buscarTareaXNombreFn(busquedaXNombre);
                    }}
                
                >Buscar</button> 
            </div>           
            <br></br>
            <div>
                Por estado: <select
                    value = {busquedaXEstado} 
                    onChange = { (evento:any) =>{                    
                        setBusquedaXEstado(evento.target.value);
                        props.buscarTareaXEstadoFn(evento.target.value);
                    }}
                    >
                    <option value="noIniciado">No iniciado</option>    
                    <option value="iniciado">Iniciado</option>    
                    <option value="terminado">Terminado</option>
                        
                </select>
            </div>
                        
        </form>
    )
}
export default BusquedaTarea;
