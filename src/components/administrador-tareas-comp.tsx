import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { EstadoTarea, Tarea } from "../models/tarea";
import BusquedaTarea from "./busqueda-comp";
import FormularioTarea from "./formulario-comp";
import ListadoTareas from "./listado-tareas-comp";

const AdministradorTareas: React.FunctionComponent = () => {
  
  useEffect(() => {
    getTareas();
  }, []); //es un arreglo vacio para que solo se ejecute una vez

  const [arregloTareas, setArregloTareas] = useState<Array<Tarea>>([]);

  const getTareas = () => {
    // Make a request for a user with a given ID
    //sheet.best docs: https://docs.sheet.best/#http-status-codes
    //https://sheet.best/admin/connection-detail/5bc9fabf-7b99-454f-b925-8425815e300a
    //Video youtube: https://www.youtube.com/watch?v=PM6S27tCvio&ab_channel=ValentinDespa

    const respuestaPromesa =
      //axios es un objeto para consumir APIs (GET- POST)
      //recibe una respuesta cuyo atributo data es un arreglo de tareas
      axios.get<any, AxiosResponse<Tarea[]>>(
        "https://sheet.best/api/sheets/5bc9fabf-7b99-454f-b925-8425815e300a"
      );

    respuestaPromesa
      .then((responseTareasDelServidor: AxiosResponse<Tarea[]>) => {
        //todo sale bien
        console.log({ responseTareasDelServidor });
        setArregloTareas(responseTareasDelServidor.data);
      })
      .catch((error: any) => {
        //Hubo un error
        alert("Hubo un error cargando las tareas de Google");
      })
      .then(() => {
        //siempre se ejecuta, en cualquier caso: éxito o error
      });
  };

  const crearNuevaTareaFn = (tareaAAdicionar: Tarea) => {
    const respuestaPromesa = axios
      //enviamos una tarea, la respuesta tiene un atributo data que es el arreglo de tareas
      .post<Tarea, AxiosResponse<Tarea[]>>(
        "https://sheet.best/api/sheets/5bc9fabf-7b99-454f-b925-8425815e300a", // direccion del API
        tareaAAdicionar
      );

    respuestaPromesa
      .then((responseTareasDelServidor: AxiosResponse<Tarea[]>) => {
        //todo sale bien
        setArregloTareas([...arregloTareas, responseTareasDelServidor.data[0]]);
      })
      .catch((error: any) => {
        //Hubo un error
        alert("Hubo un error cargando las tareas de Google");
      })
      .then(() => {
        //siempre se ejecuta, en cualquier caso: éxito o error
      });
  };

  const eliminarTareaFn = (tareaAEliminar: Tarea) => {
    const respuestaPromesa = axios.delete<Tarea, AxiosResponse<Tarea[]>>(
      `https://sheet.best/api/sheets/5bc9fabf-7b99-454f-b925-8425815e300a/codigo/${tareaAEliminar.codigo}`
    );

    respuestaPromesa
      .then((responseTareasDelServidor: AxiosResponse<Tarea[]>) => {
        const nuevoArreglo = Array<Tarea>();
        for (let i = 0; i < arregloTareas.length; i++) {
          if (tareaAEliminar !== arregloTareas[i]) {
            nuevoArreglo.push(arregloTareas[i]);
          }
        }
        setArregloTareas(nuevoArreglo);
      })

      .catch((error: any) => {
        alert("Hubo un error cargando las tareas de Google");
      })

      .then(() => {});
  };

  const modificarTareaFn = ( tareaAModificar: Tarea, estadoNuevo: EstadoTarea ) => {
    const nuevoArreglo = Array<Tarea>();
    for (let i = 0; i < arregloTareas.length; i++) {
      if (tareaAModificar.codigo === arregloTareas[i].codigo) {
        let nuevaTarea = { ...arregloTareas[i], estado: estadoNuevo };
        nuevoArreglo.push(nuevaTarea);
      } else {
        nuevoArreglo.push(arregloTareas[i]);
      }
    }
    setArregloTareas(nuevoArreglo);
  };

  const buscarTareaXNombreFn = (busqueda:string) => {

    const respuestaPromesa = axios.get<Tarea, AxiosResponse<Tarea[]>>(
      `https://sheet.best/api/sheets/5bc9fabf-7b99-454f-b925-8425815e300a/nombre/*${busqueda}*`
    );

    respuestaPromesa
      .then((responseTareasDelServidor: AxiosResponse<Tarea[]>) => {
        
        setArregloTareas(responseTareasDelServidor.data);
        
      })

      .catch((error: any) => {
        alert("Hubo un error cargando las tareas de Google");
      })

      .then(() => {});
      
  };

  return (
    <div>     
      <div >
        <div className="formulario">
            <h1>Formulario de tareas</h1>
            <FormularioTarea crearNuevaTareaFn={crearNuevaTareaFn} />
        </div>

        <hr />

        <div>
          <h1>Listado de tareas</h1>
          <ListadoTareas
            arregloTareas={arregloTareas}
            eliminarTareaFn={eliminarTareaFn}
            modificarTareaFn={modificarTareaFn}
            buscarTareaXNombreFn = {buscarTareaXNombreFn}
          />
        </div>
      </div>
    </div>
  );
};
export default AdministradorTareas;
