

function sumar (a,b){
    return a + b;
};


const sum = (a, b = 10) => {
    return a + b;
};

const sum2 = (a,b) => a + b;

const saludar = () => 'Hola mundo';

console.log(sumar(5, 10));

console.log(sum(5));

console.log(sum2(5,10));

console.log(saludar());