const fs = require('fs');

const file = './db/database.json';

const guardarDb = (data) => {

    fs.writeFileSync(file,JSON.stringify(data));

};

const readDb = () => {

    if(!fs.existsSync(file)){
        return null;
    }

    const info = fs.readFileSync(file, {encoding: 'utf-8'});
    const data = JSON.parse(info);

    return data;

}

module.exports = {
    guardarDb,
    readDb
}