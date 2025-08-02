import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Booking } from './Booking';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 100 })
  name!: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  email!: string;

  // Set nullable: false with a sensible default
  @Column({ type: 'varchar', length: 20, nullable: false, default: 'N/A' })
  phone!: string;

  // Password might not be used for all users (e.g., guest bookings), so optionally keep nullable true
  @Column({ type: 'varchar', length: 100, nullable: true })
  password?: string;

  @OneToMany(() => Booking, (booking) => booking.user)
  bookings!: Booking[];
  @Column({ type: 'varchar', length: 50, unique: true })
user_ucode!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
