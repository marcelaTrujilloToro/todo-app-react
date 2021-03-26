import React, { useState } from 'react'
import axios, { AxiosResponse } from "axios";
import { Tarea } from '../models/tarea';

const ContadorGeneral = () => {

    const [contadorGeneral, setContadorGeneral] = useState(0);

    const contarTareasFn = () => {
      const respuestaPromesa = axios.get<Tarea, AxiosResponse<Tarea[]>>(
          `https://sheet.best/api/sheets/70ab17b8-226d-4152-a895-560b4ec78c29`,
        );
    
        respuestaPromesa
          .then((responseTareasDelServidor: AxiosResponse<Tarea[]>) => {
            setContadorGeneral(responseTareasDelServidor.data.length);
          })
    
          .catch((error: any) => {
            alert("Hubo un error cargando las tareas de Google");
          })
    
          .then(() => {});
    }
    contarTareasFn();
    return (
        <div className = "contenedorContador">
          <h3>Total de tareas</h3>
          <div className = "contador">
              <p> Se tienen {contadorGeneral} tareas en total </p>
              <img className = "tarea" src="imagenes\check.png" alt=""/>
          </div>
        </div>
    )
}
export default ContadorGeneral; 