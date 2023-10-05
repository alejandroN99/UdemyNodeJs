require("colors");
const Tarea = require('./classTarea');

class Tareas {
    _listado = {};

    get listadoArr(){
        const listado = [];
        Object.keys(this._listado).forEach((key) => {
            const tarea = this._listado[key];
            listado.push(tarea);
        });

        return listado;
    };

    constructor(){
        this._listado = {};
    }

    borrarTarea (id = '') {
        if(this._listado[id]){
            delete this._listado[id];
        }
    }
    cargarTareas(tareas = []){
        // this._listado[tareas.id] = tareas;
        tareas.forEach((tarea) => {
            this._listado[tarea.id] = tarea;
        })


    }

    crearTarea(desc){
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    };

    listadoCompleto(){
        console.log();
        this.listadoArr.forEach((tarea, i) => {
            const ind = `${i + 1}`.blue;
            const {desc, completadoEn} = tarea;
            const estado = (completadoEn) ? `${'Completado'.green}` : `${'Pendiente'.red}`;

            console.log(`${ind}. ${desc} :: ${estado}`); 
        })
    }

    listadoTareasCompletadas(completadas = true){
        console.log();
        this.listadoArr.forEach((tarea) => {

            let contador = 0;

            const {desc, completadoEn} = tarea;
            const estado = (completadoEn) ? `${'Completado'.green}` : `${'Pendiente'.red}`;
            if(completadas){
                if(completadoEn){
                    contador+=1;
                    console.log(`${(contador + '.').blue}. ${desc} :: ${completadoEn}`); 
                }

            }else{
                
                if(!completadoEn){
                    contador+=1;
                    console.log(`${(contador + '.').blue}. ${desc} :: ${estado}`);
    
                }
            }
            
        });
    }

    toggleCompletadas = (ids = []) => {
        ids.forEach (id => {
            const tarea = this._listado[id];
            if(!tarea.completadoEn){
                tarea.completadoEn = new Date().toISOString()
            }
        });

        this.listadoArr.forEach( tarea => {
            if(!ids.includes(tarea.id)){
                this._listado[tarea.id].completadoEn = null;
            }
        });
    }
}

module.exports = Tareas;