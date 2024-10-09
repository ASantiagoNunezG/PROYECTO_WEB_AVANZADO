import {Router} from 'express'


const router = Router();


//--------LISTADO--------------------------------------------//

router.get('/specifications', async(req, res) => {
    try {
        res.render('specifications/list');
    }
    catch(err) {
        res.status(500).json({message: err.message});
    }
});


//--------AÑADIR --------------------------------------------//


router.get('/specifications/add', (req, res) => {
    res.render('specifications/add');
});


router.post('/specifications/add', async(req, res) => {
    try {
        res.redirect('/specifications');
    }
    catch(err) {
        res.status(500).json({message: err.message});
    }
});


//--------ACTUALIZAR --------------------------------------------//


router.get('/specifications/edit', (req, res) => {
    res.render('specifications/edit');
});

router.post('/specifications/edit', async(req, res) => {
    try {
        res.redirect('/specifications');
    }
    catch(err) {
        res.status(500).json({message: err.message});
    }
});




export default router;
