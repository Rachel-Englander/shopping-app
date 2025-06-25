import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { ElasticsearchService } from '@nestjs/elasticsearch';

@Injectable()
export class OrdersService {
  constructor(private readonly esService: ElasticsearchService) {}
  async create(order: CreateOrderDto) {
    const result = await this.esService.index({
      index: 'orders',
      document: order,
    });
    return { success: true, id: result._id };
  }
}
