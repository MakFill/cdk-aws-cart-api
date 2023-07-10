import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
class CartItems {
  @PrimaryColumn({ type: 'uuid', nullable: false })
  product_id: string;

  @Column({ type: 'integer' })
  count: number;

  @Column({ type: 'uuid', nullable: false })
  cart_id: string;
}

export default CartItems;
