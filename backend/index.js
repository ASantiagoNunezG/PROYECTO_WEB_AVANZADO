import express from "express";
import morgan from "morgan";
import { engine } from 'express-handlebars';
import { join, dirname } from 'path';
import { fileURLToPath } from "url";

// IMPORTAR LAS RUTAS
import userRoutes from './routes/user.routes.js';
import userRoleRoutes from './routes/user_role.routes.js';
import providerRoutes from './routes/provider.routes.js';
import productRoutes from './routes/product.routes.js';
import categoryRoutes from './routes/category.routes.js';
import brandRoutes from './routes/brand.routes.js';
import paymentRoutes from './routes/payment.routes.js';
import paymentTypesRoutes from './routes/payment_type.routes.js';
import specificationRoutes from './routes/specification.routes.js';
import specificationDetailRoutes from './routes/specification_detail.routes.js'; // Corregido
import sellRoutes from './routes/sell.routes.js';
import sellDetailRoutes from './routes/sell_detail.routes.js';
import shopRoutes from './routes/shop.routes.js';   
import deliveryRoutes from './routes/delivery.routes.js';
import deliveryTypeRoutes from './routes/delivery_type.routes.js';

// Iniciar
const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

// Configuraciones
app.set('port', process.env.PORT || 3000);

app.set('views', join(__dirname, '../frontend/src/app/views')); 

app.engine('.hbs', engine({
    defaultLayout: 'main',
    layoutsDir: join(app.get('views'), 'layouts'),
    partialsDir: join(app.get('views'), 'partials'),
    extname: '.hbs'
}));

app.set('view engine', '.hbs');

// Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Rutas
app.get('/', (req, res) => {
    res.render('index');
});

app.use(userRoutes);
app.use(userRoleRoutes); 
app.use(providerRoutes);  
app.use(productRoutes);   
app.use(categoryRoutes);  
app.use(brandRoutes);     
app.use(paymentRoutes);
app.use(paymentTypesRoutes);
app.use(specificationRoutes);
app.use(specificationDetailRoutes); 
app.use(sellRoutes);                
app.use(sellDetailRoutes);          
app.use(shopRoutes);
app.use(deliveryRoutes);
app.use(deliveryTypeRoutes);

// Archivos públicos
app.use(express.static(join(__dirname, 'public')));

// Run server
app.listen(app.get('port'), () => console.log('Cargando el puerto: ', app.get('port')));
