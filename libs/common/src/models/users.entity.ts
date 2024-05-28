import { Column, Entity, ManyToMany } from 'typeorm';
import { AbstractEntity } from '@app/common/database';
import { Role } from '@app/common/models/role.entity';

@Entity()
export class User extends AbstractEntity<User> {
  @Column({
    unique: true,
  })
  email: string;

  @Column()
  password: string;

  @ManyToMany(() => Role, {
    cascade: true,
  })
  roles?: Role[];
}
