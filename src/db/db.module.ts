import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import Carts from '../cart/cart.entity';
import CartItems from '../cart/cartItems.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('PG_HOST'),
        port: +configService.get('PG_PORT'),
        username: configService.get('PG_USERNAME'),
        password: configService.get('PG_PASSWORD'),
        database: configService.get('PG_DATABASE'),
        entities: [Carts, CartItems],
        synchronize: true,
      }),
    }),
  ],
})
export class DatabaseModule {}
