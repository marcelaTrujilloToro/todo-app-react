import axios, { AxiosResponse } from 'axios';
import React, { useState } from 'react'
import { Tarea } from '../models/tarea';

const ContadorHoras = () => {

    const [contadorHoras, setContadorHoras] = useState <number>(0)
 
    const contarTareasFn = () => {
      const respuestaPromesa = axios.get<Tarea, AxiosResponse<Tarea[]>>(
          `http://localhost:3001/tareas`,
        );
    
        respuestaPromesa
          .then((responseTareasDelServidor: AxiosResponse<Tarea[]>) => {
            
            let contHoras: number = 0;

            for (let i = 0; i < responseTareasDelServidor.data.length; i++) {
              
              contHoras += responseTareasDelServidor.data[i].duracion;
              console.log({contHoras});
              
            }            
            setContadorHoras(contHoras);            
          })
    
          .catch((error: any) => {
            alert("Hubo un error cargando las tareas de Google");
          })
    
          .then(() => {});
    }
    contarTareasFn();
    return (
        <div className = "contenedorContador">
          <h3>Total horas entre las tareas</h3>
          <div className = "contador">
              <p> Hay un total de {contadorHoras} horas entre todas las tareas</p>
              <img className = "tarea" src="imagenes\reloj.jpg" alt=""/>
          </div>
        </div>
    );
}
export default ContadorHoras;