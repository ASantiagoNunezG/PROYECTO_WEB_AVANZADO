import { Router } from 'express';
import pool from '../config/database.js';

const router = Router();

// Obtener todas las ventas
router.get('/pagos', async (req, res) => {
    try {
        const [paymentTypes] = await pool.query(`SELECT * FROM payment_type`);
        const [payments] = await pool.query(`
            SELECT 
                p.payment_id,
                p.state,
                p.payment_type_id,
                p.payment_date,
                p.payment_hour,
                pt.name AS metodo_pago 
            FROM payment p
            LEFT JOIN payment_type pt ON p.payment_type_id = pt.payment_type_id
        `);
        payments.forEach(payment => {
            const paymentDate = new Date(payment.payment_date);
            payment.payment_date = paymentDate.toISOString().split('T')[0]; 
        
            const paymentHour = payment.payment_hour;
            if (paymentHour) {
                payment.payment_hour = paymentHour.slice(0, 5); 
            } else {
                payment.payment_hour = '';
            }
        });
        res.render('admin/payments/list', { payments, paymentTypes, activeRoute: req.path });
    } catch (err) {
        console.error('Error al listar pagos:', err);
        res.status(500).json({ message: err.message });
    }
});

// Crear un pago
router.post('/payment/create', async (req, res) => {
    const { payment_type_id, state, payment_date, payment_hour } = req.body; 
    console.log('Datos recibidos:', req.body); 

    try {
        const [result] = await pool.query(
            'INSERT INTO payment (payment_type_id, state, payment_date, payment_hour) VALUES (?, ?, ?, ?)', 
            [payment_type_id, state, payment_date, payment_hour]
        );
        
        res.status(201).json({ message: 'Pago agregado', id: result.insertId });
    } catch (err) {
        console.error('Error al insertar pago:', err);  
        res.status(500).json({ message: err.message });
    }
});

// Editar un pago
router.put('/payment/update/:id', async (req, res) => {
    console.log('Datos recibidos:', req.body); 
    const { payment_type_id, state, payment_date, payment_hour } = req.body;
    const { id } = req.params;

    try {
        const [result] = await pool.query(
            'UPDATE payment SET payment_type_id = ?, state = ?, payment_date = ?, payment_hour = ? WHERE payment_id = ?', 
            [payment_type_id, state, payment_date, payment_hour, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Pago no encontrado' });
        }

        res.status(200).json({ message: 'Pago actualizado correctamente' });
    } catch (err) {
        console.error('Error al actualizar pago:', err);
        res.status(500).json({ message: err.message });
    }
});

// Eliminar un pago
router.delete('/payment/delete/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await pool.query('DELETE FROM payment WHERE payment_id = ?', [id]); 
        if (result.affectedRows > 0) {
            res.json({ message: 'Pago eliminado' });
        } else {
            res.status(404).json({ message: 'Pago no encontrado' });
        }
    } catch (err) {
        console.error('Error al eliminar pago:', err);  
        res.status(500).json({ message: err.message });
    }
});

export default router;
