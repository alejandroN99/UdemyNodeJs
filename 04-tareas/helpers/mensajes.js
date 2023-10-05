const { resolve } = require("path");

require("colors");


const mostrarMenu = async () => {
    return new Promise (resolve => {

        console.clear();
        console.log("=============================".blue);
        console.log("     Selecione una tarea     ".blue);
        console.log("=============================".blue);
    
        console.log(`${'1.'.blue} Crear Tarea`);
        console.log(`${'2.'.blue} Listar Tareas`);
        console.log(`${'3.'.blue} Listar Tareas completadas`);
        console.log(`${'4.'.blue} Listar Tareas pendientes`);
        console.log(`${'5.'.blue} Completar Tarea(s)`);
        console.log(`${'6.'.blue} Borrar Tarea`);
        console.log(`${'0.'.blue} Salir \n`);
    
        const readline= require("readline").createInterface({
            input: process.stdin,
            output: process.stdout,
        });
    
        readline.question('Seleccione una opción: ', (opt) => {
            readline.close();
            resolve(opt);
        })
    })


}


const pausa = async () => {
    return new Promise(resolve => {

        const readline= require("readline").createInterface({
            input: process.stdin,
            output: process.stdout,
        });
    
        readline.question(`\n Pulse ${'ENTER'.blue} para continuar \n`, (opt) => {
            readline.close();
            resolve();
        })
    })
}

module.exports = {
    mostrarMenu,
    pausa
}