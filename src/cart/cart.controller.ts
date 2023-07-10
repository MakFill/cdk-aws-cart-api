import { Controller, Get, Req, HttpStatus } from '@nestjs/common';
import { AppRequest } from '../shared';

import { CartService } from './services';

@Controller('api/profile/cart')
export class CartController {
  constructor(private cartService: CartService) {}

  @Get()
  async findCart(@Req() req: AppRequest) {
    const carts = await this.cartService.getAll();
    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      data: { carts },
    };
  }
}
