import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Envio } from "./Envio.js";
import { Almacen } from "./Almacen.js";

@Entity("paquetes")
export class Paquete {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Envio, (envio) => envio.paquetes, { nullable: false })
  @JoinColumn({ name: "envio_id" })
  envio: Envio;

  @ManyToOne(() => Almacen, (almacen) => almacen.paquetes, { nullable: false })
  @JoinColumn({ name: "almacen_id" })
  almacen: Almacen;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  peso: number;

  @Column({ type: "varchar", length: 50 })
  dimensiones: string;

  @Column({ type: "varchar", length: 255 })
  contenido: string;
}