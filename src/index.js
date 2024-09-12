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
import deliveriesRoutes from './routes/deliveries.routes.js'
import typesDeliveriesRoutes from './routes/typesDeliveries.routes.js'

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

app.set('port', process.env.PORT || 3000);

app.set('views', join(__dirname, 'views'));

app.engine('.hbs', engine({
    defaultLayout: 'main',
    layoutsDir: join(app.get('views'), 'layouts'),
    partialsDir: join(app.get('views'), 'partials'),
    extname: '.hbs'
}));

app.set('view engine', '.hbs');

app.use(morgan('dev'));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/', (req, res) => {
    res.render('index');
});

// RUTAS
app.use(userRoutes);
app.use(paymentsRoutes);
app.use(typesPaymentRoutes);
app.use(specificationsRoutes);
app.use(shopsRoutes);
app.use(deliveriesRoutes);
app.use(typesDeliveriesRoutes);

app.use(express.static(join(__dirname, 'public')));

app.listen(app.get('port'), () => console.log('Cargando el puerto: ', app.get('port')));
