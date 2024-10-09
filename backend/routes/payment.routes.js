import {Router} from 'express'


const router = Router();


//--------LISTADO--------------------------------------------//

router.get('/payments', async(req, res) => {
    try {
        res.render('payments/list');
    }
    catch(err) {
        res.status(500).json({message: err.message});
    }
});


//--------AÑADIR --------------------------------------------//


router.get('/payments/add', (req, res) => {
    res.render('payments/add');
});


router.post('/payments/add', async(req, res) => {
    try {
        res.redirect('/payments');
    }
    catch(err) {
        res.status(500).json({message: err.message});
    }
});


//--------ACTUALIZAR --------------------------------------------//


router.get('/payments/edit', (req, res) => {
    res.render('payments/edit');
});


router.post('/payments/edit', async(req, res) => {
    try {
        res.redirect('/payments');
    }
    catch(err) {
        res.status(500).json({message: err.message});
    }
});




export default router;
