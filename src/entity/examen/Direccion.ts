import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Cliente } from "./Cliente.js";

@Entity("direcciones")
export class Direccion {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Cliente, (cliente) => cliente.direcciones, { nullable: false })
  @JoinColumn({ name: "cliente_id" })
  cliente: Cliente;

  @Column({ type: "varchar", length: 255 })
  direccion: string;
}