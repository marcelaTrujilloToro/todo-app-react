import { useState } from "react";
import { EstadoTarea, Tarea } from "../models/tarea";
import FormularioTarea from "./formulario-comp";
import ListadoTareas from "./listado-tareas-comp";


const AdministradorTareas: React.FunctionComponent = () => {

    const [arregloTareas, setArregloTareas] = useState<Array<Tarea>>([]);

    const crearNuevaTareaFn = (tareaAAdicionar:Tarea) => {
        setArregloTareas([...arregloTareas, tareaAAdicionar]);
    };

    const eliminarTareaFn = (tareaAEliminar:Tarea) => {
        const nuevoArreglo = Array<Tarea>();
        for (let i = 0; i < arregloTareas.length; i++) {
          if (tareaAEliminar !== arregloTareas[i] ) {
            nuevoArreglo.push(arregloTareas[i]);
          }      
        }        
        setArregloTareas(nuevoArreglo);
    };

    const modificarTareaFn = (tareaAModificar: Tarea, estadoNuevo: EstadoTarea) => {
        const nuevoArreglo = Array<Tarea>();
        console.log(arregloTareas);
        for (let i = 0; i < arregloTareas.length; i++) {
          if (tareaAModificar.codigo === arregloTareas[i].codigo) {
            let nuevaTarea = {...arregloTareas[i], estado:estadoNuevo};
            nuevoArreglo.push(nuevaTarea);
          } 
          else{
            nuevoArreglo.push(arregloTareas[i]);
          }          
        }        
        setArregloTareas(nuevoArreglo);
        console.log(nuevoArreglo);
    };
    
    return(

        <div>
            <header>
                <h1>Formulario de tareas</h1>
            </header>
            
            <div>
                <FormularioTarea crearNuevaTareaFn= {crearNuevaTareaFn}/>
                <hr/>
                <h1>Listado de tareas</h1>
                <ListadoTareas 
                    arregloTareas = {arregloTareas}
                    eliminarTareaFn = {eliminarTareaFn}  
                    modificarTareaFn = {modificarTareaFn}
                />         
            </div>
        </div>
    );

};
export default AdministradorTareas;

