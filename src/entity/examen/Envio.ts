import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from "typeorm";
import { Cliente } from "./Cliente.js";
import { Direccion } from "./Direccion.js";
import { Paquete } from "./Paquete.js";
import { HistorialRastreo } from "./HistorialRastreo.js";
import { AuditoriaEnvio } from "./AuditoriaEnvio.js";

export enum EstadoEnvio {
  REGISTRADO = "REGISTRADO",
  EN_TRANSITO = "EN_TRANSITO",
  ENTREGADO = "ENTREGADO",
  CANCELADO = "CANCELADO",
}

@Entity("envios")
export class Envio {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Cliente, (cliente) => cliente.enviosEnviados, { nullable: false })
  @JoinColumn({ name: "remitente_id" })
  remitente!: Cliente;

  @ManyToOne(() => Cliente, (cliente) => cliente.enviosRecibidos, { nullable: false })
  @JoinColumn({ name: "destinatario_id" })
  destinatario!: Cliente;

  @ManyToOne(() => Direccion, { nullable: false })
  @JoinColumn({ name: "direccion_origen_id" })
  direccionOrigen!: Direccion;

  @ManyToOne(() => Direccion, { nullable: false })
  @JoinColumn({ name: "direccion_destino_id" })
  direccionDestino!: Direccion;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  costo_total!: number;

  @Column({ type: "datetime" })
  fecha!: Date;

  @Column({ type: "enum", enum: EstadoEnvio })
  estado!: EstadoEnvio;

  @OneToMany(() => Paquete, (paquete) => paquete.envio)
  paquetes!: Paquete[];

  @OneToMany(() => HistorialRastreo, (rastreo) => rastreo.envio)
  historial!: HistorialRastreo[];

  @OneToMany(() => AuditoriaEnvio, (auditoria) => auditoria.envio)
  auditorias!: AuditoriaEnvio[];
}