import express from 'express';
import { join, dirname} from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors'; 
import 'dotenv/config';
import productsRouter from './src/routes/products.routes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PORT = 2000; 

const app = express (); 

app.use(cors({
    origin: (origin, callback) => {
        if(!origin || origin === `http://localhost:${PORT}`) {
            callback(null, true);
        }else {
            callback(new Error("No permitido por CORS"));
        }

    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-type", "Authorization"]
}));

app.use(express.json());

app.use((req, res, next) => {
    console.log(`Datos recibidos: ${req.method} ${req.url}`);
    next();
});

app.use(productsRouter);

app.use(function(req, res, next) {
    res.status(404)
    res.send("Ruta no encontrada.");
});

app.listen(PORT, () => {
    console.log(`Servidor en http://localhost:${PORT}`);
});
