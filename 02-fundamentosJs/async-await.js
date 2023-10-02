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


const infoEmployee = async (id) => {
    
    try {
        const employee = await getEmployee(id);
        const salario = await getSalario(id);
        
        return `El empleado ${employee} tiene un salario: ${salario}`;
        
    } catch (error) {
        throw error;
    }
};

infoEmployee(1)
    .then(msg => console.log(msg))
    .catch(err => console.log(err));