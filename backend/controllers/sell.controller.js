// sell.controller.js
import Sell from '../models/sell.model.js'; // Asegúrate de que el modelo esté definido correctamente

export const getSells = async (req, res) => {
    try {
        const sells = await Sell.findAll(); // Obtener todas las ventas
        res.render('admin/sells/list', { sells }); // Renderizar la vista de lista con los datos de ventas
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener las ventas');
    }
};

export const getSellById = async (req, res) => {
    const { id } = req.params;
    try {
        const sell = await Sell.findByPk(id); // Buscar la venta por ID
        if (sell) {
            res.render('admin/sells/edit', { sell }); // Renderizar la vista de edición
        } else {
            res.status(404).send('Venta no encontrada');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener la venta');
    }
};

export const createSell = async (req, res) => {
    const { user_id, payment_id, delivery_id, state, final_price, delivery_commision, sell_date } = req.body;
    try {
        await Sell.create({ user_id, payment_id, delivery_id, state, final_price, delivery_commision, sell_date });
        res.redirect('/admin/sells'); // Redirigir después de crear
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al crear la venta');
    }
};

export const updateSell = async (req, res) => {
    const { id } = req.params;
    const { user_id, payment_id, delivery_id, state, final_price, delivery_commision, sell_date } = req.body;
    try {
        const sell = await Sell.findByPk(id);
        if (sell) {
            await sell.update({ user_id, payment_id, delivery_id, state, final_price, delivery_commision, sell_date });
            res.redirect('/admin/sells'); // Redirigir después de editar
        } else {
            res.status(404).send('Venta no encontrada');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al actualizar la venta');
    }
};

export const deleteSell = async (req, res) => {
    const { id } = req.params;
    try {
        await Sell.destroy({ where: { sell_id: id } }); // Eliminar la venta
        res.redirect('/admin/sells'); // Redirigir después de eliminar
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al eliminar la venta');
    }
};
