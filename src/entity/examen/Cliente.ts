import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Direccion } from "./Direccion.js";
import { Envio } from "./Envio.js";

export enum EstadoCliente {
  ACTIVO = "ACTIVO",
  INACTIVO = "INACTIVO",
}

@Entity("clientes")
export class Cliente {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 100 })
  nombre: string;

  @Column({ type: "enum", enum: EstadoCliente })
  estado: EstadoCliente;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  limite_credito: number;

  @OneToMany(() => Direccion, (direccion) => direccion.cliente)
  direcciones: Direccion[];

  @OneToMany(() => Envio, (envio) => envio.remitente)
  enviosEnviados: Envio[];

  @OneToMany(() => Envio, (envio) => envio.destinatario)
  enviosRecibidos: Envio[];
}