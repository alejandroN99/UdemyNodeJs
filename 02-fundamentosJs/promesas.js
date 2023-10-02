const empleados = [
    {
        id: 1,
        name: 'Alejandro'
    },
    {
        id: 2,
        name: 'Pepe'
    },
    {
        id: 3,
        name: 'Juan'
    }
];

const salarios =[
    {
        id: 1,
        salario: 1111
    },
    {
        id: 2,
        salario: 1200
    }
]


const getEmployee = (id) => {
    
    return new Promise((resolve, reject) => {
        const employee = empleados.find( (e) => e.id === id)?.name;

        (employee)
        ? resolve(employee)
        : reject(`Empleado con id ${id}, no existe!`);

    })
};

const getSalario = (id) => {
    
    return new Promise((resolve, reject) => {
        const salario = salarios.find( (s) => s.id === id)?.salario;

        (salario)
        ? resolve(salario)
        : reject(`No existe salario con id ${id}!`);

    })
};


// getEmployee(1)
// .then(employee => console.log(employee))
// .catch(err => console.log(err));

// getSalario(1)
// .then(salario => console.log(salario))
// .catch(err => console.log(err));


// getEmployee(1)
// .then(employee => {

//     getSalario(1)
//         .then(salario =>{

//             console.log(`El empleado ${employee} tiene un salario de : ${salario}`);
//     })
//     .catch(err => console.log(err));

// }).catch(err => console.log(err));

//Promesas en cadena

let nombre;

getEmployee(1)
    .then( employee => {
        nombre = employee
        return getSalario(1);
    })
    .then(salario => console.log(`El empleado ${nombre} tiene un salario de : ${salario}`))
    .catch(err => console.log(err));