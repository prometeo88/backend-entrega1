const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 8080;
app.use(express.urlencoded({extended:true}))

const ProductManager = require('./ProductManager.js')
const productManager = new ProductManager('./productos.json');

productManager.addProduct({title:"PRODUCTO A",description:"un producto A", price:20, thumbnail:"ruta/imagenA.jpg",code:1, stock:55})
productManager.addProduct({title:"PRODUCTO B",description:"un producto B", price:20, thumbnail:"ruta/imagenB.jpg",code:2, stock:50})
productManager.addProduct({title:"PRODUCTO C",description:"un producto C", price:20, thumbnail:"ruta/imagenC.jpg",code:3, stock:60})
productManager.addProduct({title:"PRODUCTO D",description:"un producto D", price:20, thumbnail:"ruta/imagenD.jpg",code:4, stock:65})
productManager.addProduct({title:"PRODUCTO E",description:"un producto E", price:20, thumbnail:"ruta/imagenE.jpg",code:5, stock:70})

app.get('/', (req, res) => {
    const respuesta = `<p style="color:blue">SERVIDOR DE PRUEBA FUNCIONANDO</p>`;
    res.send(respuesta);
});


app.get('/products', async (req, res) =>{
try {
    await productManager.loadProducts();
    const product = productManager.getProducts()

    if(req.query.limit){
        const limit = parseInt(req.query.limit);
        console.log('Limite solicitado;',limit)
        if(!isNaN(limit) && limit > 0){
            products = product.slice(0,limit)
            console.log(products)
        } else {
            console.log("Error al aplicar el limite")
            return res.status(400).send("Error al aplicar el limite")
        }
    }

    res.json(products)
    
} catch (error) {
    console.log("Error al cargar archivos")
    res.status(500).send('Error al cargar archivos')
    
}
});

app.get('/products/:pid', async (req, res)=>{
    try {  
    const productId = parseInt(req.params.pid)
    await productManager.loadProducts()
    const product = productManager.getProductById(productId)
if(product){
    res.json(product)}
else{
    const respuestaE = `<p style="color:red">PRODUCTO NO ENCONTRADO</p>`;
    res.status(400).send(respuestaE)

    }
}
    catch (error) {
        console.log("ERROR AL ENCONTRAR PRODUCTO")
                
    }


})



app.listen(PORT, () => {
    console.log("Server running");
});