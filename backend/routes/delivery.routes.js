import {Router} from 'express'


const router = Router();


//--------LISTADO--------------------------------------------//

router.get('/deliveries', async(req, res) => {
    try {
        res.render('deliveries/list');
    }
    catch(err) {
        res.status(500).json({message: err.message});
    }
});


//--------AÑADIR --------------------------------------------//


router.get('/deliveries/add', (req, res) => {
    res.render('deliveries/add');
});


router.post('/deliveries/add', async(req, res) => {
    try {
    
        res.redirect('/deliveries');
    }
    catch(err) {
        res.status(500).json({message: err.message});
    }
});


//--------ACTUALIZAR --------------------------------------------//


router.get('/deliveries/edit', (req, res) => {
    res.render('deliveries/edit');
});


router.post('/deliveries/edit', async(req, res) => {
    try {
        res.redirect('/deliveries');
    }
    catch(err) {
        res.status(500).json({message: err.message});
    }
});




export default router;