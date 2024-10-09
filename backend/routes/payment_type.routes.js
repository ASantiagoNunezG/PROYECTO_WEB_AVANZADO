import {Router} from 'express'
import pool from '../config/database.js'

const router = Router();


//--------LISTADO--------------------------------------------//

router.get('/payment-type', async(req, res) => {
    try {
        res.render('payment-type/list');
    }
    catch(err) {
        res.status(500).json({message: err.message});
    }
});


//--------AÑADIR --------------------------------------------//


router.get('/payment-type/add', (req, res) => {
    res.render('payment-type/add');
});


router.post('/payment-type/add', async(req, res) => {
    try {
        res.redirect('/payment-type');
    }
    catch(err) {
        res.status(500).json({message: err.message});
    }
});


//--------ACTUALIZAR --------------------------------------------//


router.get('/payment-type/edit', (req, res) => {
    res.render('payment-type/edit');
});


router.post('/payment-type/edit', async(req, res) => {
    try {
        res.redirect('/payment-type');
    }
    catch(err) {
        res.status(500).json({message: err.message});
    }
});




export default router;
