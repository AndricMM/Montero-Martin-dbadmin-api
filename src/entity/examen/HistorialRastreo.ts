import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Envio } from "./Envio.js";

@Entity("historial_rastreo")
export class HistorialRastreo {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Envio, (envio) => envio.historial, { nullable: false })
  @JoinColumn({ name: "envio_id" })
  envio!: Envio;

  @Column({ type: "datetime" })
  fecha!: Date;

  @Column({ type: "varchar", length: 255 })
  ubicacion_actual!: string;

  @Column({ type: "enum", enum: ["REGISTRADO", "EN_TRANSITO", "ENTREGADO", "CANCELADO"] })
  estado_evento!: string;

  @Column({ type: "text", nullable: true })
  observaciones!: string;
}