import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Auction, AuctionStatus } from './entities/auction.entity';
import { Repository } from 'typeorm';
import { CreateAuctionDto } from './dto/create-auction.dto';
import { UpdateAuctionDto } from './dto/update-auction.dto';

@Injectable()
export class AuctionService {
  constructor(
    @InjectRepository(Auction)
    private readonly auctionRepository: Repository<Auction>,
  ) {}

  async create(
    sellerId: string,
    createAuctionDto: CreateAuctionDto,
  ): Promise<Auction> {
    if (createAuctionDto.endTime <= createAuctionDto.startTime)
      throw new BadRequestException('End time must be after start time');

    const auction = this.auctionRepository.create({
      ...createAuctionDto,
      sellerId,
      currentPrice: createAuctionDto.startPrice,
      status: AuctionStatus.DRAFT,
    });

    return this.auctionRepository.save(auction);
  }

  async findAll(): Promise<Auction[]> {
    return this.auctionRepository.find({
      relations: ['seller'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Auction> {
    const auction = await this.auctionRepository.findOne({
      where: { id },
      relations: ['seller', 'winner'],
    });

    if (!auction) throw new NotFoundException('Auction not found');

    return auction;
  }

  async update(
    id: string,
    sellerId: string,
    updateAuctionDto: UpdateAuctionDto,
  ): Promise<Auction> {
    const auction = await this.findOne(id);

    if (auction.sellerId !== sellerId)
      throw new ForbiddenException('You can only update your own auctions');

    if (auction.status !== AuctionStatus.DRAFT)
      throw new BadRequestException('Can only update draft auctions');

    Object.assign(auction, updateAuctionDto);
    return this.auctionRepository.save(auction);
  }

  async remove(id: string, sellerId: string): Promise<void> {
    const auction = await this.findOne(id);

    if (auction.sellerId !== sellerId)
      throw new ForbiddenException('You can nlt delete your own auctions');

    if (auction.status !== AuctionStatus.DRAFT)
      throw new BadRequestException('Can only delete draft auctions');

    await this.auctionRepository.remove(auction);
  }
}
