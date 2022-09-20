import { OrderStatus } from './../../../domain/entities/order.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { AccountSchema } from './account-schema';

@Entity()
export class OrderSchema {
  //typeorm
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'float' })
  amount: number;

  @Column({ length: 255 })
  creditCardNumber: string;

  @Column({ length: 255 })
  creditCardName: string;

  @Column({ length: 255 })
  status: OrderStatus;

  @Column()
  accountId: string;

  @ManyToOne(() => AccountSchema, (account) => account.orders)
  account: AccountSchema;
}
