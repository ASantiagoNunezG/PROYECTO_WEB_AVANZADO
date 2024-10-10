//routes/shop.routes.js
import { Router } from "express";
import pool from '../config/database.js'

const router = Router();

//LISTADO DE TIENDAS
router.get('/shops', async(req,res) =>{
    try {
        const [result] = await pool.query(`
            SELECT * FROM SHOP`
        );
        res.render('admin/shops/list', {shops : result});
    }catch(err){
        console.error('error al listar tiendas', err)
        res.status(500).json({message: err.message})
    }
})

//AGREGAR TIENDA
router.post('/shops/add', async (req, res) => {
    const { name, address} = req.body;
    console.log('Estos datos fueron recibidos', req.body);

    try{
        const [result] = await pool.query(
            'INSERT INTO SHOP (NAME, ADDRESS) VALUES (?,?)',
            [name,address]
        );
        res.status(201).json({message: 'Nueva tienda agregada', idShop:result.insertId})
    }catch(error){
        console.error('Error al insertar la tiendaaaaa!', error);
        res.status(500).json({message: error.message});
    }
});

//ACTUALIZAR TIENDAS

router.put('/shops/update/:idShop', async (req, res)=> {
    console.log('Datos recibidos:', req.body);
    const {name, address} = req.body;
    const {idShop} = req.params;

    try {
        const [result] = await pool.query(
            'UPDATE shop set name = ?, address = ? where shop_id = ?',
            [name,address, idShop]
        );
        if(result.affectedRows === 0){
            return res.status(404).json({message: 'Tienda no encontrada'});
        }
        res.status(200).json({message: 'Tienda Actualizada correctamente'});
    }catch (error){
        console.error('Error al actualizar la tienda:', error);
        res.status(500).json({message:error.message});
    }
});

//Eliminar una registro de tienda
router.delete('/shops/delete/:idShop', async(req,res)=>{
    const {idShop} = req.params;
    try{
        const [result] = await pool.query('DELETE FROM shop WHERE shop_id = ?',[idShop]);
        if(result.affectedRows > 0){
            res.json({message: 'Tienda eliminada'});
        }else{
            console.error('Error al eliminar la tienda', err);
            res.status(404).json({message: 'Tienda no encontrada'});
        }
    }catch(err){
        res.status(500).json({message: err.message});
    }
})


export default router;