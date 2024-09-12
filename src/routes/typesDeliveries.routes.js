import {Router} from 'express'


const router = Router();


//--------LISTADO--------------------------------------------//

router.get('/types-deliveries', async(req, res) => {
    try {
        res.render('types-deliveries/list');
    }
    catch(err) {
        res.status(500).json({message: err.message});
    }
});


//--------AÑADIR --------------------------------------------//


router.get('/types-deliveries/add', (req, res) => {
    res.render('types-deliveries/add');
});


router.post('/types-deliveries/add', async(req, res) => {
    try {
        res.redirect('/types-deliveries');
    }
    catch(err) {
        res.status(500).json({message: err.message});
    }
});


//--------ACTUALIZAR --------------------------------------------//


router.get('/types-deliveries/edit', (req, res) => {
    res.render('types-deliveries/edit');
});


router.post('/types-deliveries/edit', async(req, res) => {
    try {
        res.redirect('/types-deliveries');
    }
    catch(err) {
        res.status(500).json({message: err.message});
    }
});




export default router;