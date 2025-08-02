import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './User';
import { Slot } from './Slot';

@Entity()
export class Booking {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User, (user) => user.bookings)
  @JoinColumn({ name: 'user_ucode' })
  user!: User;

  @ManyToOne(() => Slot, (slot) => slot.bookings)
 @JoinColumn({ name: 'slot_ucode' })
  slot!: Slot;

  @Column("simple-array")
  seats!: string[];

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  totalAmount!: number;

  @Column()
  status!: string;

  @Column()
  bookingReference!: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  bookingDate!: Date;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
