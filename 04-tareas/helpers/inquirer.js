const inquirer = require('inquirer');

require("colors");

const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message: '¿Que tarea desea hacer?',
        choices: [
            {
                value: '1',
                name: `${'1'.blue}.Crear tarea`
            },
            {
                value: '2',
                name: `${'2'.blue}.Listar tarea`
            },
            {
                value: '3',
                name: `${'3'.blue}.Listar tareas completadas`
            },
            {
                value: '4',
                name: `${'4'.blue}.Listar tareas pendientes`
            },
            {
                value: '5',
                name: `${'5'.blue}.Completar tarea(s)`
            },
            {
                value: '6',
                name: `${'6'.blue}.Borrar tarea`
            },{
                value: '0',
                name: `${'0'.blue}. Salir`
            }
        ]
    }
];


const enter = [
    {
        type:'input',
        name: 'enter',
        message: `\n Pulse ${'ENTER'.blue} para continuar \n`
    }
]

const inquirerMenu = async () => {
  console.clear();
  console.log("=============================".blue);
  console.log("     Selecione una tarea     ".green);
  console.log("=============================".blue);

  const { opcion } = await inquirer.prompt(preguntas);

  return opcion;
};

const pausa = async () => {
    console.log('\n');
    await inquirer.prompt(enter);
};

const leerInput = async (message) => {
    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate(value){
                if(value.length === 0){
                    return 'Porfavor introduzca un valor'
                }

                return true
            }
        }
    ]

    const { desc } = await inquirer.prompt(question);

    return desc;
}

const listadoTareasBorrar = async ( tareas = []) => {
    const choices = tareas.map( (tarea, i) => {

        const idx = `${i + 1}.`.blue
        return {
            value: tarea.id,
            name: `${idx} ${tarea.desc}`
        }
    })

    choices.unshift({
        value: '0',
        name: '0.'.blue +'Cancelar'
    })

    const preguntas = [

        {
            type: 'list',
            name: 'id',
            message:'Borrar tarea',
            choices
        }
    ]

    const { id } = await inquirer.prompt(preguntas);

    return id;
}

const confirm = async (message = '') => {
    const preguntas = [

        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ]

    const { ok } = await inquirer.prompt(preguntas);

    return ok;

}

const listadoCheclist = async ( tareas = []) => {
    const choices = tareas.map( (tarea, i) => {

        const idx = `${i + 1}.`.blue
        return {
            value: tarea.id,
            name: `${idx} ${tarea.desc}`,
            checked:(tarea.completadoEn) ? true : false
        }
    })


    const preguntas = [

        {
            type: 'checkbox',
            name: 'ids',
            message:'Selecciones',
            choices
        }
    ]

    const { ids } = await inquirer.prompt(preguntas);

    return ids;
}

module.exports = {
  inquirerMenu,
  pausa,
  leerInput,
  listadoTareasBorrar,
  confirm,
  listadoCheclist
};
