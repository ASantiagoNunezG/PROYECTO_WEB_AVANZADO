import express from "express";
import morgan from "morgan";
import { engine } from 'express-handlebars';
import { join, dirname } from 'path';
import { fileURLToPath } from "url";

// IMPORTAR LAS RUTAS
import sellRoutes from './routes/sell.routes.js';


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
        }
    }
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

app.use(sellRoutes); 

// Archivos públicos
app.use(express.static(join(__dirname, '../frontend/src/public')));

// Run server
app.listen(app.get('port'), () => console.log('Cargando el puerto: ', app.get('port')));
