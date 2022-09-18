import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class AccountSchema {
  //typeorm
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 255 })
  name: string;

  @Column({ length: 255 })
  token: string;
}
