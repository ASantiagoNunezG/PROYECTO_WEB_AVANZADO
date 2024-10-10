import { Router } from 'express';
import pool from '../config/database.js';

const router = Router();

//--------LISTADO--------------------------------------------//
router.get('/deliveries', async (req, res) => {
    try {
        const [deliveryTypes] = await pool.query(`SELECT * FROM delivery_type`);
        const [shops] = await pool.query(`SELECT * FROM shop`);
        const [deliveries] = await pool.query(`
            SELECT d.delivery_id, d.state, d.delivery_date, d.delivery_hour, dt.name AS delivery_type_name, s.name AS shop_name
            FROM delivery d
            JOIN delivery_type dt ON d.delivery_type_id = dt.delivery_type_id
            JOIN shop s ON d.shop_id = s.shop_id
        `);

        // Formatear fechas y horas antes de enviarlas a la vista
        deliveries.forEach(delivery => {
            const deliveryDate = new Date(delivery.delivery_date);
            delivery.delivery_date = deliveryDate.toISOString().split('T')[0]; // Solo YYYY-MM-DD

            // Opcional: Si necesitas formatear la hora también
            const deliveryHour = delivery.delivery_hour;
            delivery.delivery_hour = deliveryHour.slice(0, 5); // Formato HH:mm
        });

        res.render('admin/deliveries/list', { deliveries, deliveryTypes, shops });
    } catch (err) {
        console.error('Error al listar las entregas', err);
        res.status(500).json({ message: err.message });
    }
});

//--------CREAR NUEVO---------------------------------------//

router.post('/deliveries/add', async (req, res) => {
    const { delivery_type_id, shop_id, state, delivery_date, delivery_hour } = req.body;
    try {
        const [result] = await pool.query(
            'INSERT INTO delivery (delivery_type_id, shop_id, state, delivery_date, delivery_hour) VALUES (?, ?, ?, ?, ?)',
            [delivery_type_id, shop_id, state, delivery_date, delivery_hour]
        );
        res.status(201).json({ message: 'Nueva entrega agregada', idDelivery: result.insertId });
    } catch (err) {
        console.error('Error al insertar la nueva entrega', err);
        res.status(500).json({ message: err.message });
    }
});

//--------ACTUALIZAR----------------------------------------//
router.get('/deliveries/edit/:idDelivery', async (req, res) => {
    const { idDelivery } = req.params;
    try {
        const [delivery] = await pool.query(`SELECT * FROM delivery WHERE delivery_id = ?`, [idDelivery]);
        const [deliveryTypes] = await pool.query(`SELECT * FROM delivery_type where delivery_id = ?`);
        const [shops] = await pool.query(`SELECT * FROM shop`);

        if (delivery.length === 0) {
            return res.status(404).json({ message: 'Entrega no encontrada' });
        }

        res.render('admin/deliveries/edit', { delivery: delivery[0], deliveryTypes, shops });
    } catch (err) {
        console.error('Error al obtener la entrega', err);
        res.status(500).json({ message: err.message });
    }
});

router.put('/deliveries/update/:id', async (req, res) => {
    const { delivery_type_id, shop_id, state, delivery_date, delivery_hour } = req.body;
    const { id } = req.params;

    try {
        await pool.query(
            `UPDATE delivery SET delivery_type_id = ?, shop_id = ?, state = ?, delivery_date = ?, delivery_hour = ? WHERE delivery_id = ?`,
            [delivery_type_id, shop_id, state, delivery_date, delivery_hour, id]
        );
        res.status(200).json({ message: 'Entrega actualizada correctamente' });
    } catch (err) {
        console.error('Error al actualizar entrega:', err);
        res.status(500).json({ message: 'Error al actualizar la entrega' });
    }
});


//--------ELIMINAR------------------------------------------//
router.delete('/deliveries/delete/:idDelivery', async (req, res) => {
    const { idDelivery } = req.params;
    try {
        const [result] = await pool.query('DELETE FROM delivery WHERE delivery_id = ?', [idDelivery]);
        if (result.affectedRows > 0) {
            res.json({ message: 'Entrega eliminada' });
        } else {
            res.status(404).json({ message: 'Entrega no encontrada' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;

