const inquirer = require('inquirer');

require("colors");

const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message: '¿Que tarea desea hacer?',
        choices: [
            {
                value: 1,
                name: `${'1'.blue}.Buscar ciudad`
            },
            {
                value: 2,
                name: `${'2'.blue}.Historial`
            },
            {
                value: 0,
                name: `${'3'.blue}.Salir`
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

const listadoLugares= async ( lugares = []) => {
    const choices = lugares.map( (lugar, i) => {

        const idx = `${i + 1}.`.blue
        return {
            value: lugar.id,
            name: `${idx} ${lugar.nombre}`
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
            message:'Seleccione lugar:',
            choices
        }
    ]

    const { id } = await inquirer.prompt(preguntas);

    return id;
}



module.exports = {
  inquirerMenu,
  pausa,
  leerInput,
  listadoLugares
};
