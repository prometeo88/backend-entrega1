const express = require('express');
const app = express();
const PORT = 8080;
app.use(express.urlencoded({extended:true}))

const ProductManager = require('../ProductManager.js')
const productManager = new ProductManager('../productos.json');

app.get('/', (req, res) => {
    const respuesta = `<p style="color:blue">SERVIDOR DE PRUEBA FUNCIONANDO</p>`;
    res.send(respuesta);
});

app.get('/products', async (req, res) =>{
try {
    await productManager.loadProducts();
    const product = productManager.getProducts()
    res.json(product)
    
} catch (error) {
    console.log("Error al cargar archivos")
    res.status(500).send('Error al cargar archivos')
    
}
});



app.listen(PORT, () => {
    console.log("Server running");
});