import axios, { AxiosResponse } from 'axios';
import React, { useState } from 'react'
import { Tarea } from '../models/tarea';

const ContadorHoras = () => {

    const [contadorHoras, setContadorHoras] = useState(0)

    const contarTareasFn = () => {
      const respuestaPromesa = axios.get<Tarea, AxiosResponse<Tarea[]>>(
          `https://sheet.best/api/sheets/70ab17b8-226d-4152-a895-560b4ec78c29/duracion/*`,
        );
    
        respuestaPromesa
          .then((responseTareasDelServidor: AxiosResponse<Tarea[]>) => {
            setContadorHoras(responseTareasDelServidor.data.length);
            console.log(responseTareasDelServidor.data.length);
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