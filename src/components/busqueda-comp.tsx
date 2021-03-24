import React, { useState } from 'react'

type BusquedaProps = {

    buscarTareaXNombreFn: (busquedaXNombre:string) => void;
}

const BusquedaTarea:React.FunctionComponent<BusquedaProps> = (props) => {

    const [busquedaXNombre, setBusquedaXNombre] = useState<string>("");

    return (
        <form className = "form">
            Por nombre<input
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
        </form>
    )
}
export default BusquedaTarea;
