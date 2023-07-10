import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import Cart from '../cart.entity';
import CartItems from '../cartItems.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,
    @InjectRepository(CartItems)
    private cartItemsRepository: Repository<CartItems>,
  ) {}

  async getAll(): Promise<Cart[]> {
    const carts = await this.cartRepository.find();
    const items = await this.cartItemsRepository.find();
    const itemsMap = new Map();
    items.forEach((item) => itemsMap.set(item.cart_id, item.count));

    return carts.map((item) => ({ ...item, count: itemsMap.get(item.id) }));
  }
}
