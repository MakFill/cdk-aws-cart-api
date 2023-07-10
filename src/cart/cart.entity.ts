import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class Carts {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', nullable: false })
  user_id: string;

  @Column({ type: 'text', nullable: false })
  title: string;

  @Column({ type: 'date', nullable: false })
  created_at: string;

  @Column({ type: 'date', nullable: false })
  updated_at: string;

  @Column({ type: 'enum', nullable: false, enumName: 'status' })
  status: 'OPEN' | 'ORDERED';
}

export default Carts;
