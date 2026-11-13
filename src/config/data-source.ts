import "reflect-metadata";
import { DataSource } from "typeorm";
import { Categoria } from "../entity/Categoria.js";
import { Producto } from "../entity/Producto.js";
import { Venta } from "../entity/Venta.js";
import { DetalleVenta } from "../entity/DetalleVenta.js";

// Examen - LogiExpress
import { Cliente } from "../entity/examen/Cliente.js";
import { Direccion } from "../entity/examen/Direccion.js";
import { Envio } from "../entity/examen/Envio.js";
import { Paquete } from "../entity/examen/Paquete.js";
import { Almacen } from "../entity/examen/Almacen.js";
import { HistorialRastreo } from "../entity/examen/HistorialRastreo.js";
import { AuditoriaEnvio } from "../entity/examen/AuditoriaEnvio.js";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 3306,
    username: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "logiexpress_db",
    // false: las tablas, procedures y triggers ya se crean con el script .sql
    synchronize: false,
    logging: true,
    entities: [
        Categoria, Producto, Venta, DetalleVenta,
        Cliente, Direccion, Envio, Paquete, Almacen, HistorialRastreo, AuditoriaEnvio,
    ],
    subscribers: [],
    migrations: [],
});