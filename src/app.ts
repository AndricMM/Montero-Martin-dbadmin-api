import express, { Request, Response } from 'express';
import userRoutes from './routes/user.routes.js';
import productoRoutes from './routes/producto.routes.js';
import ventaRoutes from './routes/venta.routes.js';
import envioRoutes from './routes/examen/envio.routes.js';
import almacenRoutes from './routes/examen/almacen.routes.js';
import clienteRoutes from './routes/examen/cliente.routes.js';
const app = express();

// Middleware para parsear JSON
app.use(express.json());
app.use('/api', userRoutes);
app.use('/api/productos', productoRoutes);
app.use('/api/ventas', ventaRoutes);
app.use('/api/envios', envioRoutes);
app.use('/api/almacenes', almacenRoutes);
app.use('/api/clientes', clienteRoutes);
// Ruta de prueba/salud
app.get('/api/status', (req: Request, res: Response) => {
  res.json({ status: 'OK', message: 'API funcionando correctamente' });
});

export default app;