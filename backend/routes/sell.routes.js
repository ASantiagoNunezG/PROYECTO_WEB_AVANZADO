import { Router } from 'express';
import pool from '../config/database.js';

const router = Router();

// Obtener todas las ventas
router.get('/ventas', async (req, res) => {
    try {
        const [result] = await pool.query(`
            SELECT 
                s.sell_id, 
                s.sell_date, 
                s.user_id,
                s.payment_id,
                s.delivery_id,
                u.name AS cliente, 
                pt.name AS metodo_pago, 
                dt.name AS tipo_entrega, 
                s.final_price, 
                s.delivery_commision, 
                s.state 
            FROM sell s
            LEFT JOIN user u ON s.user_id = u.user_id
            LEFT JOIN payment p ON s.payment_id = p.payment_id
            LEFT JOIN payment_type pt ON p.payment_type_id = pt.payment_type_id
            LEFT JOIN delivery d ON s.delivery_id = d.delivery_id
            LEFT JOIN delivery_type dt ON d.delivery_type_id = dt.delivery_type_id
        `);
        res.render('admin/sells/list', { sells: result });
    } catch (err) {
        console.error('Error al listar ventas:', err);  
        res.status(500).json({ message: err.message });
    }
});

//Crear una venta
router.post('/sell/create', async (req, res) => {
    const { idcli, idpay, iddel, state, fpri, delcom, date } = req.body; 
    console.log('Datos recibidos:', req.body); 

    try {
        const [result] = await pool.query(
            'INSERT INTO sell (user_id, payment_id, delivery_id, state, final_price, delivery_commision, sell_date) VALUES (?, ?, ?, ?, ?, ?, ?)', 
            [idcli, idpay, iddel, state, fpri, delcom, date]
        );
        res.status(201).json({ message: 'Venta agregada', id: result.insertId });
    } catch (err) {
        console.error('Error al insertar venta:', err);  
        res.status(500).json({ message: err.message });
    }
});

// Editar una venta
router.put('/sell/update/:id', async (req, res) => {
    console.log('Datos recibidos:', req.body); // Verificar qué datos se reciben
    const { idcli, idpay, iddel, state, fpri, delcom, date } = req.body;
    const { id } = req.params;

    try {
        const [result] = await pool.query(
            'UPDATE sell SET user_id = ?, payment_id = ?, delivery_id = ?, state = ?, final_price = ?, delivery_commision = ?, sell_date = ? WHERE sell_id = ?', 
            [idcli, idpay, iddel, state, fpri, delcom, date, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Venta no encontrada' });
        }

        res.status(200).json({ message: 'Venta actualizada correctamente' });
    } catch (err) {
        console.error('Error al actualizar venta:', err);
        res.status(500).json({ message: err.message });
    }
});


// Actualizar una venta
router.post('/sell/update/:id', async (req, res) => {
    const { id } = req.params;
    const { fecha, estado, total, user_id, payment_id, delivery_id } = req.body; 
    try {
        const [result] = await pool.query(
            'UPDATE sell SET sell_date = ?, state = ?, final_price = ?, user_id = ?, payment_id = ?, delivery_id = ? WHERE sell_id = ?',
            [fecha, estado, total, user_id, payment_id, delivery_id, id]
        );
        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'Venta actualizada' });
        } else {
            console.error('Error al actualizar venta:', err);  
            res.status(404).json({ message: 'Venta no encontrada' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Eliminar una venta
router.delete('/sell/delete/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await pool.query('DELETE FROM sell WHERE sell_id = ?', [id]); 
        if (result.affectedRows > 0) {
            res.json({ message: 'Venta eliminada' });
        } else {
            console.error('Error al eliminar venta:', err);  
            res.status(404).json({ message: 'Venta no encontrada' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;
