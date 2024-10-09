import {Router} from 'express'


const router = Router();


//CATEGORIAS


//--------LISTADO --------------------------------------------//
router.get('/categories', async(req, res) => {
    try {
        res.render('categorias/list');
    }
    catch(err) {
        res.status(500).json({message: err.message});
    }
});


//--------AÑADIR --------------------------------------------//


router.get('/categories/add', (req, res) => {
    res.render('categorias/add');
});


router.post('/categories/add', async(req, res) => {
    try {
        res.redirect('/categories');
    }
    catch(err) {
        res.status(500).json({message: err.message});
    }
});


//--------ACTUALIZAR --------------------------------------------//


router.get('/categories/edit', (req, res) => {
    res.render('categorias/edit');
});


router.post('/categories/edit', async(req, res) => {
    try {
        res.redirect('/categories');
    }
    catch(err) {
        res.status(500).json({message: err.message});
    }
});




export default router;
