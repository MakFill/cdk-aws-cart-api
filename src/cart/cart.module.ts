import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderModule } from '../order/order.module';

import { CartController } from './cart.controller';
import { CartService } from './services';
import Cart from './cart.entity';
import CartItems from './cartItems.entity';

@Module({
  imports: [OrderModule, TypeOrmModule.forFeature([Cart, CartItems])],
  providers: [CartService],
  controllers: [CartController],
})
export class CartModule {}
