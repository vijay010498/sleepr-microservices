import { Column, Entity } from 'typeorm';
import { AbstractEntity } from '@app/common';

@Entity()
export class Role extends AbstractEntity<Role> {
  @Column()
  name;
}
