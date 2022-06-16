// Array de productos



let productos = []


// Lista de controladores

const getProductos = (req, res) =>{
    res.json(productos)
}

const getProductoId = (req, res) => {

    const id = Number(req.params.id)
    if( id ) {
        const productoParam = productos.filter( producto => {
            return producto.id === id
        })
        res.json(productoParam)
    } else {
        res.json(productos)
    }
   
}

const postProducto = (req, res) => {
    
    if (productos.length === 0) {
        const id = 1
        const { title, price, thumbnail } = req.body
        productos.push({ title, price, thumbnail, id }) 
        res.status(201).send('Su producto ha sido agregado')
            
    }else if (productos.length > 0) {
        const idSuma = productos[productos.length - 1].id
        const id = idSuma + 1
        const { title, price, thumbnail } = req.body
        productos.push({ title, price, thumbnail, id }) 
        res.status(201).send('Su producto ha sido agregado')
    }
}

const putProducto = (req, res) => {
    const id = Number(req.params.id)

    if(!isNaN(id)){
    const { title, price, thumbnail } = req.body
    
    productos.forEach(producto => {
        if(producto.id === id) { 
            producto.title = title
            producto.price = price
            producto.thumbnail = thumbnail
        }
        
    })
    res.status(201).send('Su producto ha sido modificado')
} else {
    res.status(404).send('El producto no existe')
} 
   
}

const deleteProducto = (req, res) => {

    const id = Number(req.params.id)

    if(!isNaN(id)) {
        const nuevoArreglo = productos.filter(productos => productos.id != id)
        productos = []
        productos.push(nuevoArreglo)
        res.status(201).send('Producto eliminado')
    } else {
        res.status(404).send('La eliminacion no fue procesada')
    }
}

module.exports = {
    getProductos,
    getProductoId,
    postProducto,
    putProducto,
    deleteProducto
}