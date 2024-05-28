import { Logger, NotFoundException } from '@nestjs/common';
import { AbstractEntity } from '@app/common/database/abstract.entity';
import { EntityManager, FindOptionsWhere, Repository } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

export abstract class AbstractRespository<T extends AbstractEntity<T>> {
  //Protected because any sub repo classes can have access to them and implement any  additional functions that abstract repo does not provide
  protected abstract readonly logger: Logger;
  constructor(
    private readonly entityRepository: Repository<T>,
    private readonly entityManager: EntityManager,
  ) {}

  async create(entity: T): Promise<T> {
    return this.entityManager.save(entity);
  }

  async findOne(
    where: FindOptionsWhere<T>,
    notFoundError: Error = new NotFoundException('Entity Not Found'),
  ): Promise<T> {
    const entity = await this.entityRepository.findOne({
      where,
    });
    if (!entity) {
      this.logger.warn(`Entity was not found with where: ${where} `);
      throw notFoundError;
    }

    return entity;
  }

  async findOneAndUpdate(
    where: FindOptionsWhere<T>,
    partialEntity: QueryDeepPartialEntity<T>,
  ): Promise<T> {
    const updateResult = await this.entityRepository.update(
      where,
      partialEntity,
    );
    if (!updateResult.affected) {
      this.logger.warn(`Entity was not found with where: ${where} `);
      throw new NotFoundException('Document was not found');
    }

    return this.findOne(where);
  }

  async find(where: FindOptionsWhere<T>): Promise<T[]> {
    return this.entityRepository.findBy(where);
  }

  async findOneAndDelete(where: FindOptionsWhere<T>): Promise<T> {
    const entity = await this.findOne(where);
    await this.entityRepository.delete(where);
    return entity;
  }
}
