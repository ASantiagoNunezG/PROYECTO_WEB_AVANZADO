import { Router } from "express";

const router = Router();

//LISTADO DE TIENDAS
router.get('/shops', async(req,res) =>{
    try {
        res.render('shops/list');
    }catch(err){
        res.status(500).json({message: err.message})
    }
})

//AGREGAR TIENDA
router.get('/shops/add', (req, res) => {
    res.render('shops/add');
});


router.post('/shops/add', async(req, res) => {
    try {
        res.redirect('/shops?message=Tienda agregado exitosamente');
    }
    catch(err) {
        res.status(500).json({message: err.message});
    }
});


//ACTUALIZAR TIENDAS


router.get('/shops/edit', (req, res) => {
    res.render('shops/edit');
});


router.post('/shops/edit', async(req, res) => {
    try {
        res.redirect('/shops?message=Tienda actualizada correctamente');
    }
    catch(err) {
        res.status(500).json({message: err.message});
    }
});

export default router;