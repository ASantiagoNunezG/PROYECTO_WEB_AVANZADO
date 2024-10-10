//routes/delivery_type.routes.js
import {Router} from 'express'
import pool from '../config/database.js';


const router = Router();


//--------LISTADO--------------------------------------------//

router.get('/types-deliveries', async(req, res) => {
    try {
        const [result] = await pool.query(`
            SELECT * from delivery_type
            `);
        res.render('admin/types-deliveries/list', {tdeliveries: result});
    }
    catch(err) {
        console.error('error al listar los tipos de deliveries', err)
        res.status(500).json({message: err.message});
    }
});

router.post('/types-deliveries/add', async(req, res) => {
    const {name} = req.body;
    console.log('Se recibieron estos datos', req.body)
    try {
        const [result] = await pool.query(
            'INSERT INTO DELIVERY_TYPE (NAME) VALUES (?)',[name]
        );
        res.status(201).json({message: 'Nuevo tipo de delivery agregado', idTDelivery: result.insertId});
    }
    catch(err) {
        console.error('Error al isertar el nuevo tipo de delivery', err)
        res.status(500).json({message: err.message});
    }
});


//--------ACTUALIZAR --------------------------------------------//
router.put('/types-deliveries/update/:idTDelivery', async(req, res) => {
    console.log('Datos recibidos:', req.body);
    const {name} = req.body;
    const {idTDelivery} = req.params;
    try {
        const [result] = await pool.query(
            'UPDATE DELIVERY_TYPE SET NAME = ? WHERE DELIVERY_TYPE_ID = ?',[name, idTDelivery]
        );
        if(result.affectedRows === 0){
            return res.status(404).json({message: 'Tipo de delivery no encontrado'})
        }
        res.status(200).json({message: 'Tipo de delivery actualizado correctamente'});
    }
    catch(err) {
        console.error('Error al actualizar el tipo de delivery', err)
        res.status(500).json({message: err.message});
    }
});

//Eliminar el registro de un tipo de delivery
router.delete('/types-deliveries/delete/:idTDelivery', async(req, res)=>{
    const {idTDelivery} = req.params;
    try{
        const [result] = await pool.query('DELETE FROM DELIVERY_TYPE WHERE DELIVERY_TYPE_ID = ?', [idTDelivery]);
        if(result.affectedRows>0){
            res.json({message: 'Tipo de delivery elimanado'})
        }else{
            console.error('Error al eliminar el tipo de delivery', err);
            res.status(404).json({message: 'Tipo de delivery no encontrado'});
        }
    }catch(err){
        res.status(500).json({message: err.message});
    }
})



export default router;