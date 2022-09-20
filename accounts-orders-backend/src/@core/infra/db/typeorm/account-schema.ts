import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { OrderSchema } from './order-schema';

@Entity()
export class AccountSchema {
  //typeorm
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 255 })
  name: string;

  @Column({ length: 255 })
  token: string;

  @OneToMany(() => OrderSchema, (order) => order.account)
  orders: [OrderSchema];
}
