import express from "express";
import morgan from "morgan";
import { engine } from 'express-handlebars';
import { join, dirname } from 'path';
import { fileURLToPath } from "url";
import Handlebars from 'handlebars';

// IMPORTAR LAS RUTAS
import sellRoutes from './routes/sell.routes.js';

//RUTAS DE TIENDAS
import shopRoutes from './routes/shop.routes.js';

//RUTA DE TIPO DE DELIVERIES
import deliveryTypeRoutes from './routes/delivery_type.routes.js'

//RUTA DE LOS DELIVERIES
import deliveriesRoutes from './routes/delivery.routes.js'

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
    extname: '.hbs',
    helpers: {
        formatDate: (dateString) => {
            const date = new Date(dateString);
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0'); 
            const year = date.getFullYear();
            return `${day}/${month}/${year}`;
        },
        formatTime: (time) => {
            const options = { hour: '2-digit', minute: '2-digit', second: '2-digit' };
            return new Date(time).toLocaleTimeString('es-ES', options); // Formato en español
        }
        
    }
}));

app.set('view engine', '.hbs');


// Registrar el helper 'json' después de definir el motor de vistas
Handlebars.registerHelper('json', function(context) {
    return JSON.stringify(context);
});
Handlebars.registerHelper('ifCond', function (a, b) {
    return (a === b) ? true : false;
});

// Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Rutas
app.get('/', (req, res) => {
    res.render('index');
});

app.use(sellRoutes); 

app.use(shopRoutes);
app.use(deliveryTypeRoutes)
app.use(deliveriesRoutes)

// Archivos públicos
app.use(express.static(join(__dirname, '../frontend/src/public')));

// Run server
app.listen(app.get('port'), () => console.log('Cargando el puerto: ', app.get('port')));

