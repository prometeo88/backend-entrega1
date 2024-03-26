const objetos = [
    {
    manzanas:3,
    peras:2,
    carne:1,
    jugos:5,
    dulces:2
    },
    {
    manzanas:1,
    sandias:1,
    huevos:6,
    jugos:1,
    panes:4
    }
];


const nuevaListaProductos = objetos.reduce((lista, objetos) => {
    Object.keys(objetos).forEach(producto => {
        if(!lista.includes(producto)){
            lista.push(producto)
        }
    })
    return lista}, [],

    


)

console.log(nuevaListaProductos)


