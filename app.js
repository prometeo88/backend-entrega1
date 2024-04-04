const fs = require('fs')

class ProductManager {
    constructor(filePath) {
        this.products = [];
        this.nextId = 1;
        this.path = filePath
    }

    addProduct(product) {
        if (!this.isProductValid(product)) {
            console.log("ERROR: el producto no es valido");
            return;
        }
        if (this.isCodeDuplicate(product.code)) {
            console.log("ERROR: EL CODIGO DEL PRODUCTO YA ESTA EN USO");
            return;
        }

        product.id = this.nextId++;
        this.products.push(product);
        this.saveProducts();
    }

    getProducts() {
        return this.products;
    }

    getProductById(id) {
        const product = this.products.find(p => p.id === id);
        if (product) {
            return product;
        } else {
            console.log("ERROR: PRODUCTO NO ENCONTRADO");
        }
    }

    isProductValid(product) {
        return (
            product.title &&
            product.description &&
            product.thumbnail &&
            product.code &&
            product.stock !== undefined
        );
    }

    isCodeDuplicate(code) {
        return this.products.some(p => p.code === code);
    }

    updateProduct(id, updatedProduct) {
        const index = this.products.findIndex(p => p.id === id);
        if (index !== -1) {
        this.products[index] = { ...this.products[index], ...updatedProduct };
        this.saveProducts();
            console.log("Producto actualizado correctamente.");
        } else {
            console.log("ERROR: PRODUCTO NO ENCONTRADO");
        }
}
    deleteProducts(id){
        const index = this.products.findIndex(p => p.id === id);
        if (index !== -1) { 
            this.products.splice(index, 1);
            this.saveProducts();
            console.log("Producto eliminado con exito");
        }else {
            console.log("Error al eliminar el producto ")
        }

        }

    saveProducts(){
        try {
            const data = JSON.stringify(this.products,null,2);
            fs.writeFileSync(this.path,data);
            console.log("Productos guardados correctamente en archivo")
        } catch (err){
            console.log("ERRROR: NO SE PUDO GUARDAR LOS PRODUCTOS")
        }
    }
        
        loadProducts(){
        try {
            const data = fs.readFileSync(this.path,'utf8')
            this.products = JSON.parse(data)
        } catch (err) {
            console.log("ERROR: NO SE PUDO LEER LOS PRODUCTOS")
        }
    }


    }


const productManager = new ProductManager('productos.json');

productManager.addProduct({
    title: "Product A",
    description: "UN PRODUCTO A",
    price: 15,
    thumbnail: "ruta/imagenA.jpg",
    code: "P001",
    stock: 10,
});

productManager.addProduct({
    title: "Product B",
    description: "UN PRODUCTO B",
    price: 15,
    thumbnail: "ruta/imagenB.jpg",
    code: "P002",
    stock: 7,
});

productManager.addProduct({
    title: "Product C",
    description: "UN PRODUCTO C",
    price: 15,
    thumbnail: "ruta/imagenA.jpg",
    code: "P003",
    stock: 4,
});

const products = productManager.getProducts();

console.log(products);

const updatedProduct = productManager.updateProduct(2, { title: "PRODUCTO B MODIFICADO", price:35} )

console.log(products);

const deleteProducts = productManager.deleteProducts(3)

productManager.addProduct({
    title: "Producto D",
    description: "un prod D",
    price: 30,
    thumbnail: "ruta/imagenD.jpg",
    code:"P004",
    stock: 5,
})


