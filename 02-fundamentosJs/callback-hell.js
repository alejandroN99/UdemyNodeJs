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


const getEmployee = (id, callback) => {
    const employee = empleados.find( (e) => e.id === id)?.name;

    if(employee){
        return callback(null, employee);
    }else{
        return callback(`El empleado con el id: ${id} , no existe!`);
    }
};



const getSalario= (id, callback) => {
    const salario = salarios.find( (s) => s.id === id)?.salario;
    
    if(salario){
        return callback(null, salario);
    }else{
        return callback(`El empleado con el id: ${id} , no existe!`);
    }
};

getEmployee(1, (err, employee) => {
    if(err) {
        console.log(err);
    }

    getSalario(1, (err, salario) => {
        if(err) {
            console.log(err);
        }
        console.log(`El empleado ${employee} tiene un salario de : ${salario}`)
    });


});
