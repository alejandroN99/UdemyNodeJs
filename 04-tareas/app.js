require("colors");

const { guardarDb, readDb } = require("./helpers/guardarDB");
const {
  inquirerMenu,
  pausa,
  leerInput,
  listadoTareasBorrar,
  confirm,
  listadoCheclist,
} = require("./helpers/inquirer");
const Tarea = require("./models/classTarea");
const Tareas = require("./models/classTareas");

console.clear();

const main = async () => {
  let opt = "";
  const tareas = new Tareas();

  const tareasDb = readDb();

  if (tareasDb) {
    tareas.cargarTareas(tareasDb);
  }

  do {
    opt = await inquirerMenu();

    switch (opt) {
      case "1":
        const desc = await leerInput("Description: ");
        tareas.crearTarea(desc);
        break;

      case "2":
        tareas.listadoCompleto();
        break;

      case "3":
        tareas.listadoTareasCompletadas(true);
        break;

      case "4":
        tareas.listadoTareasCompletadas(false);
        break;
      case "5":
        const ids = await listadoCheclist(tareas.listadoArr);
        tareas.toggleCompletadas(ids);
        break;
      case "6":
        const id = await listadoTareasBorrar(tareas.listadoArr);
        if (id !== "0") {
          const ok = await confirm("¿Está seguro de borrar la tarea?");
          if (ok) {
            tareas.borrarTarea(id);
            console.log("Tarea borrada");
          }
        }
        break;
    }

    guardarDb(tareas.listadoArr);

    await pausa();
  } while (opt !== "0");
};

main();
