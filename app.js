class ProductManager {
    constructor() {
        this.products = [];
        this.nextId = 1;
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
}

const productManager = new ProductManager();

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
const productsById = productManager.getProductById(3);

console.log(products);
console.log(productsById);