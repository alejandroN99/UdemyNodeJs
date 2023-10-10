require('dotenv').config();

const { leerInput, inquirerMenu, pausa,listadoLugares } = require("./helpers/inquirer");
const Busquedas = require("./models/busquedas");


const main = async () => {
  const busquedas = new Busquedas();
  let opt = "";

  opt = await inquirerMenu();

  do {
    switch (opt) {
      case 1:
        const buscar = await leerInput('Lugar: ');
        const lugares = await busquedas.cuidad(buscar);
        const id = await listadoLugares(lugares);
        if(id === '0') continue;

        const lugarSel = await lugares.find(l => l.id === id);

        busquedas.agregarHistorial(lugarSel.nombre);


        const clima = await busquedas.climaLugar(lugarSel.ltd, lugarSel.lng);

        console.clear();
        console.log('\n Información de la ciudad: \n');
        console.log('Ciudad:'+ lugarSel.nombre);
        console.log('Lgn:'+ lugarSel.lng);
        console.log('Ltd:'+ lugarSel.ltd);
        console.log('Temperatura:'+ clima.temp);
        console.log('Mínima:'+ clima.min);
        console.log('Máxima:'+ clima.max);
        console.log('Descripción de clima: '+ clima.desc);


        break;
      case 2:
        busquedas.historialCapitalizado.forEach((lugar,i) => {
          const indice = `${i + 1}.`.blue;
          console.log(`${indice} ${lugar}`);
        })
        break;
    }

    if (opt !== 0) await pausa();
  } while (opt !== 0);
};

main();
