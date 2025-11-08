import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';


export enum AuctionStatus {
  DRAFT = 'draft',
  UPCOMING = 'upcoming',
  LIVE = 'live',
  ENDED = 'ended',
  PAID = 'paid',
}

@Entity('auctions')
export class Auction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'seller_id' })
  sellerId: string;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column('decimal', { precision: 10, scale: 2 })
  startPrice: number;

  @Column('decimal', { precision: 10, scale: 2 })
  currentPrice: number;

  @Column('timestamp')
  startTime: Date;

  @Column('timestamp')
  endTime: Date;

  @Column({
    type: 'enum',
    enum: AuctionStatus,
    default: AuctionStatus.DRAFT,
  })
  status: AuctionStatus;

  @Column({ name: 'winner_id', nullable: true })
  winnerId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
