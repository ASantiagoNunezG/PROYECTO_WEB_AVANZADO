import { Router } from 'express';
import pool from '../config/database.js';

const router = Router();

// Obtener todas las Tipo de pagos
router.get('/tipos-pagos', async (req, res) => {
    try {
        const [result] = await pool.query(`
            SELECT * FROM payment_type
        `);
        res.render('admin/types-payment/list', { payments: result });
    } catch (err) {
        console.error('Error al listar tipo de pagos:', err);  
        res.status(500).json({ message: err.message });
    }
});

//Crear una Tipo de pago
router.post('/payment-type/create', async (req, res) => {
    const { name } = req.body; 
    console.log('Datos recibidos:', req.body); 

    try {
        const [result] = await pool.query(
            'INSERT INTO payment_type (name) VALUES (?)', 
            [name]
        );
        res.status(201).json({ message: 'Tipo de pago agregada', id: result.insertId });
    } catch (err) {
        console.error('Error al insertar tipo de pago:', err);  
        res.status(500).json({ message: err.message });
    }
});

// Editar una Tipo de pago
router.put('/payment-type/update/:id', async (req, res) => {
    console.log('Datos recibidos:', req.body); 
    const { name } = req.body;
    const { id } = req.params;

    try {
        const [result] = await pool.query(
            'UPDATE payment_type SET name = ? WHERE payment_type_id = ?', 
            [name, id ]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Tipo de pago no encontrada' });
        }

        res.status(200).json({ message: 'Tipo de pago actualizada correctamente' });
    } catch (err) {
        console.error('Error al actualizar tipo de pago:', err);
        res.status(500).json({ message: err.message });
    }
});


// Actualizar una tipo de pago
router.post('/payment-type/update/:id', async (req, res) => {
    const { id } = req.params;
    const { fecha, estado, total, user_id, payment_id, delivery_id } = req.body; 
    try {
        const [result] = await pool.query(
            'UPDATE sell SET sell_date = ?, state = ?, final_price = ?, user_id = ?, payment_id = ?, delivery_id = ? WHERE sell_id = ?',
            [fecha, estado, total, user_id, payment_id, delivery_id, id]
        );
        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'Tipo de pago actualizada' });
        } else {
            console.error('Error al actualizar tipo de pago:', err);  
            res.status(404).json({ message: 'Tipo de pago no encontrada' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Eliminar una Tipo de pago
router.delete('/payment-type/delete/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await pool.query('DELETE FROM payment_type WHERE payment_type_id = ?', [id]); 
        if (result.affectedRows > 0) {
            res.json({ message: 'Tipo de pago eliminada' });
        } else {
            console.error('Error al eliminar tipo de pago:', err);  
            res.status(404).json({ message: 'Tipo de pago no encontrada' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;
