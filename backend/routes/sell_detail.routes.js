import { Router } from 'express';
import pool from '../config/database.js';

const router = Router();

// Obtener todas los detalles de ventas
router.get('/detalle-venta', async (req, res) => {
    try {
        const [result] = await pool.query(`
            SELECT * FROM sell_detail
        `);
        res.render('admin/sells-detail/list', { sells: sellDetails  });
    } catch (err) {
        console.error('Error al listar detalles de ventas:', err);  
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
