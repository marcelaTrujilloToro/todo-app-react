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
            `https://sheet.best/api/sheets/70ab17b8-226d-4152-a895-560b4ec78c29/estado/*${"noIniciado"}*`,
          );
      
        respuestaPromesa
        .then((responseTareasDelServidor: AxiosResponse<Tarea[]>) => {
            setContadorXEstado({...contadorXEstado, contNoIniciado: responseTareasDelServidor.data.length});
        })
    
        .catch((error: any) => {
            alert("Hubo un error cargando las tareas de Google por estado no iniciado");
        })
    
        .then(() => {});
        //----------------------------------------------------------------------------------------------------
        const respuestaPromesaIni = axios.get<Tarea, AxiosResponse<Tarea[]>>(
            `https://sheet.best/api/sheets/70ab17b8-226d-4152-a895-560b4ec78c29/estado/*${"iniciado"}*`,
          );
      
        respuestaPromesaIni
        .then((responseTareasDelServidor: AxiosResponse<Tarea[]>) => {
            setContadorXEstado({...contadorXEstado, contIniciado: responseTareasDelServidor.data.length});
        })
    
        .catch((error: any) => {
            alert("Hubo un error cargando las tareas de Google por estado iniciado");
        })
    
        .then(() => {});
        //----------------------------------------------------------------------------------------------------
        const respuestaPromesaTer = axios.get<Tarea, AxiosResponse<Tarea[]>>(
            `https://sheet.best/api/sheets/70ab17b8-226d-4152-a895-560b4ec78c29/estado/*${"terminado"}*`,
          );
      
        respuestaPromesaTer
        .then((responseTareasDelServidor: AxiosResponse<Tarea[]>) => {
            setContadorXEstado({...contadorXEstado, contTerminado: responseTareasDelServidor.data.length});
        })
    
        .catch((error: any) => {
            alert("Hubo un error cargando las tareas de Google por estado terminado");
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