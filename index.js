import express from 'express';
import cors from 'cors'; 
import 'dotenv/config';
import productsRouter from './src/routes/products.routes.js';
import authRouter from "./src/routes/auth.routes.js";
import bodyParser from 'body-parser';


const PORT = process.env.PORT; 

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

app.use(bodyParser.json());

app.use(express.json());

app.use((req, res, next) => {
    console.log(`Datos recibidos: ${req.method} ${req.url}`);
    next();
});

app.use("/api/products", productsRouter);
app.use("/auth", authRouter);

app.use(function(req, res, next) {
    res.status(404)
    res.send("Ruta no encontrada.");
});

if(process.env.NODE_ENV !== "production"){
    app.listen(PORT, () => {
        console.log(`Servidor en http://localhost:${PORT}`);
    });
}

export default app;
