const fs = require('fs');
const axios = require("axios");


class Busquedas {
    historial = [];
    dbPath= './db/database.json'

    get paramsMapbox (){
        return {
            'access_token': process.env.MAPBOX_KEY,
            'language': 'es',
            'limit': 5
        }
    }

    get paramsWeather (){
        return {
            'appid': process.env.OPENWEATHER_KEY,
            'lang': 'es',
            'units': 'metric'
        };
    }

    get historialCapitalizado (){

        return this.historial.map( lugar => {
            let palabras = lugar.split(' ');
            palabras = palabras.map( p => p[0].toUpperCase() + p.substring(1));

            return palabras.join(' ');
        });
    }

    constructor(){
        this.leerDb()
    }

    async cuidad (lugar = '') {
        //Petición hhtp
        try {
            const instance = axios.create({
                baseURL:`https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
                params: this.paramsMapbox
            })
            const resp = await instance.get();

            return resp.data.features.map(lugar => ({
                id: lugar.id,
                nombre: lugar.place_name,
                lng: lugar.center[0],
                ltd: lugar.center[1]
            }));

        } catch (error) {
            return [];
        }

        
    } 

    async climaLugar(lat, lon) {
        try {
            const instance = axios.create({
                baseURL:`https://api.openweathermap.org/data/2.5/weather`,
                params: {...this.paramsWeather,lat,lon}
            })
            const resp = await instance.get();

            const {weather, main} = resp.data;

            return {
                temp: main.temp,
                min:main.temp_min,
                max:main.temp_max,
                desc: weather[0].description
            }
        } catch (error) {
            console.log(error);
        }
    }

    agregarHistorial(lugar = ''){
        if(this.historial.includes(lugar.toLocaleLowerCase()))return;

        this.historial = this.historial.splice(0,5);



        this.historial.unshift(lugar.toLocaleLowerCase());
        this.guardarDb();
    }

    guardarDb(){

        const payload = {
            historial: this.historial
        }

        fs.writeFileSync(this.dbPath,JSON.stringify(payload))
    }

    leerDb(){

        if(!fs.existsSync(this.dbPath)){
            return
        }

        const info = fs.readFileSync(this.dbPath, {encoding:'utf-8'});
        const data = JSON.parse(info);

        this.historial = data.historial;

    }
}

module.exports = Busquedas;
