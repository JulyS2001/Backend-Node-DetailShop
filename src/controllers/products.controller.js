import {  getProductByIdService, getProductsByFilters, createProductService, updateProductService, deleteProductService } from "../services/products.service.js";


export const getProductById = async ( req, res ) => {
    try{
    const id = req.params.id; 
    if (!id){
        return res.status(400).json({message: 'ID del producto es necesario'});
    }
    const product = await getProductByIdService(id); 
    if(product){
        res.status(200).json(product);
    } else {
        res.status(404).json({ message: 'Producto no encontrado.'});
    }
  }catch(error){
        res.status(500).json({message: 'Error al obtener el producto'});
  }
};

export const getAllProducts = async (req, res) => {
    try{
        const categoryQuery = req.query.categoria;
        const precioQuery = req.query.precio; 

    const products = await getProductsByFilters({ categoria: categoryQuery, precio: precioQuery});

    if(products.length === 0){
        return res.status(400).json({message: 'No se encontraron productos con esos filtros'})
    }
    return res.status(200).json(products); 
 }catch(error){
    console.error(error);
    res.status(500).json({message: 'Error interno del servidor'});
 }
}

export const createProduct = async (req, res) => {
    const producto = req.body.producto;
    console.log(producto); 
    if(!producto){
        return res.status(400).json({ message: 'Informacion del producto es requerida'});
    }
    try{
        const id = await createProductService(producto)
        producto.id = id; 
        res.status(200).json(producto);
    }catch(error){
        console.error(error)
        res.status(500).json({ message: 'Error al obtener el producto'})
    }
}

export const updateProduct = async (req, res) => {
  const id = req.params.id;
  const data = req.body;

  if (!id) {
    return res.status(400).json({ message: 'ID del producto es requerido' });
  }

  try {
    await updateProductService(id, data);
    res.status(200).json({ message: 'Producto actualizado correctamente' });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Error al actualizar el producto' });
  }
}

export const deleteProduct = async(req, res) => {

    const id = req.params.id; 

    if(!id){
        return res.status(400).json({ message: "El ID del producto es requerido"});
    }

    try{
        const deleted = await deleteProductService(id);

        if(!deleted) {
            return res.status(400).json({ message: "Producto no encotnrado"});
        }

        res.status(200).json({ message: "Producto eliminado correctamente"});
    }catch(error){
        console.error(error);
        res.status(500).json({ message: "Error al eliminar el producto"});
    }
}