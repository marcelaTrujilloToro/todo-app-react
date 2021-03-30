import axios, { AxiosResponse } from 'axios';
import React, { useState } from 'react'
import { Tarea } from '../models/tarea';

const ContadorXEstados = () => {
    
    const [contadorXEstado, setContadorXEstado] = useState({
        contNoIniciado: 0,
        contIniciado: 0,
        contTerminado: 0,
    });
    
    const{contNoIniciado, contIniciado, contTerminado} = contadorXEstado;

    const contarTareasXEstadoFn = () => {
        const respuestaPromesa = axios.get<Tarea, AxiosResponse<Tarea[]>>(
            `http://localhost:3001/tareas`
        );      
        respuestaPromesa
        .then((responseTareasDelServidor: AxiosResponse<Tarea[]>) => {
            let contadorNOIni : number = 0;
            let contadorIni : number = 0;
            let contadorTer : number = 0;

            for (let i = 0; i < responseTareasDelServidor.data.length; i++) {
                if (responseTareasDelServidor.data[i].estado === 'noIniciado') {
                    contadorNOIni ++;
                }else if (responseTareasDelServidor.data[i].estado === 'iniciado') {
                    contadorIni ++;    
                } else {
                    contadorTer ++;
                }                
            } 
            setContadorXEstado({...contadorXEstado, contNoIniciado: contadorNOIni, contIniciado:contadorIni, contTerminado: contadorTer});
        })    
        .catch((error: any) => {
            //alert("Hubo un error cargando las tareas de Google por estado");
        })    
        .then(() => {}); 
    }
    
    contarTareasXEstadoFn();

    return (
        <div className = "contenedorContador">
            <h3>Total de tareas por estados</h3>
            <div className = "contador">
                <div className = "contadorEstados">
                    <p> Se tienen {contNoIniciado} tareas no iniciadas </p>
                    <p> Se tienen {contIniciado} tareas iniciadas </p>
                    <p> Se tienen {contTerminado} tareas terminadas </p>
                </div>
                <img className = "tarea" src="imagenes\checklist-vender-inmueble-1024x1024.png" alt=""/>
            </div>
        </div>
    )
}
export default ContadorXEstados;