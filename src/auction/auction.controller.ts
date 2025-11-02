import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { AuctionService } from './auction.service';
import { CreateAuctionDto } from './dto/create-auction.dto';
import { UpdateAuctionDto } from './dto/update-auction.dto';

@Controller('auctions')
export class AuctionController {
  constructor(private readonly auctionService: AuctionService) {}

  @Post()
  create(
    @Body() createAuctionDto: CreateAuctionDto,
    @Query('sellerId') sellerId: string, // jwt soon
  ) {
    return this.auctionService.create(sellerId, createAuctionDto);
  }

  @Get()
  findAll() {
    return this.auctionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.auctionService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatAuctionDto: UpdateAuctionDto,
    @Query('sellerId') sellerId: string, // jwt soon
  ) {
    return this.auctionService.update(id, sellerId, updatAuctionDto);
  }

  @Delete(':id')
  remove(
    @Param('id') id: string,
    @Query('sellerId') sellerId: string, // jwt soon
  ) {
    return this.auctionService.remove(id, sellerId);
  }
}
