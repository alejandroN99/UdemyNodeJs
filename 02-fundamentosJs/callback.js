
const getUser = (id, callback) => {

    const user = {
        id,
        nombre : "Alejandro"
    };

    setTimeout(() => {
        callback(user);
    }, 2000)
};


getUser(10, (usuario) => {
    console.log(usuario);
});