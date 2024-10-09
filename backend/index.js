import express from "express";
import morgan from "morgan";
import { engine } from 'express-handlebars';
import { join, dirname } from 'path';
import { fileURLToPath } from "url";

// IMPORTAR LAS RUTAS
import userRoutes from './routes/user.routes.js';
import paymentsRoutes from './routes/payments.routes.js';
import typesPaymentRoutes from './routes/typesPayment.routes.js';
import specificationsRoutes from './routes/specifications.routes.js';
import shopsRoutes from './routes/shops.routes.js';   
import deliveriesRoutes from './routes/deliveries.routes.js';
import typesDeliveriesRoutes from './routes/typesDeliveries.routes.js';

// Iniciar
const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

// Configuraciones
app.set('port', process.env.PORT || 3000);

app.set('views', join(__dirname, '../frontend/src/app/views')); // Asegúrate de usar join aquí

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
app.use(paymentsRoutes);
app.use(typesPaymentRoutes);
app.use(specificationsRoutes);
app.use(shopsRoutes);
app.use(deliveriesRoutes);
app.use(typesDeliveriesRoutes);

// Archivos públicos
app.use(express.static(join(__dirname, 'public')));

// Run server
app.listen(app.get('port'), () => console.log('Cargando el puerto: ', app.get('port')));
