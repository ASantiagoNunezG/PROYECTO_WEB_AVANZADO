import {Router} from 'express'


const router = Router();


//--------LISTADO--------------------------------------------//

router.get('/types-payment', async(req, res) => {
    try {
        res.render('types-payment/list');
    }
    catch(err) {
        res.status(500).json({message: err.message});
    }
});


//--------AÑADIR --------------------------------------------//


router.get('/types-payment/add', (req, res) => {
    res.render('types-payment/add');
});


router.post('/types-payment/add', async(req, res) => {
    try {
        res.redirect('/types-payment');
    }
    catch(err) {
        res.status(500).json({message: err.message});
    }
});


//--------ACTUALIZAR --------------------------------------------//


router.get('/types-payment/edit', (req, res) => {
    res.render('types-payment/edit');
});


router.post('/types-payment/edit', async(req, res) => {
    try {
        res.redirect('/types-payment');
    }
    catch(err) {
        res.status(500).json({message: err.message});
    }
});




export default router;
